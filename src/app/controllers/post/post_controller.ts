import { sql } from 'bun'
import { Context } from 'hono'

class PostController {
  async index(request: Context) {
    const posts = await sql`
      SELECT * FROM posts
      LIMIT ${10}
    `

    const data = {
      posts: posts,
    }

    return request.json({ data }, 200)
  }

  async show(request: Context) {
    const { id } = request.req.param()

    const posts = await sql`
      SELECT * FROM posts
      WHERE id = ${id}
      LIMIT 1
    `

    const post = posts[0]

    if (!post) {
      return request.notFound()
    }

    const data = {
      post: post,
    }

    return request.json({ data }, 200)
  }

  async create(request: Context) {
    type Post = {
      title: string
      slug?: string
      content: string
    }

    const post = (await request.req.json()) as Post
    post.slug = post.title.replace(/ /g, '-').toLowerCase()

    const sqlPost = await sql`
      INSERT INTO posts (title, content, slug, updated_at)
      VALUES (${post.title}, ${post.content}, ${post.slug}, now())
      RETURNING *
    `

    const data = {
      post: sqlPost,
    }

    return request.json({ data }, 201)
  }

  async update(request: Context) {
    type Post = {
      title: string
      slug?: string
      content: string
    }

    const post = (await request.req.json()) as Post
    post.slug = post.title.replace(/ /g, '-').toLowerCase()

    const { id } = request.req.param()

    const sqlPost = await sql`
      UPDATE posts
      SET title = ${post.title}, content = ${post.content}, slug = ${post.slug}, updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `

    const data = {
      post: sqlPost,
    }

    return request.json({ data }, 200)
  }

  async delete(request: Context) {
    const { id } = request.req.param()

    await sql`
      DELETE FROM posts
      WHERE id = ${id}
    `

    return request.newResponse(null, 204)
  }
}

export default PostController
