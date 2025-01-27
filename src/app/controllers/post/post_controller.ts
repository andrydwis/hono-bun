import { sql } from 'bun'
import { Context } from 'hono'

class PostController {
  async index(request: Context) {
    const posts = await sql`
      SELECT * FROM posts
      LIMIT ${10}
    `

    const data = {
      status: 200,
      data: posts,
    }

    return request.json({ data })
  }

  async show(request: Context) {
    const { id } = request.req.param()

    const post = await sql`
      SELECT * FROM posts
      WHERE id = ${id}
    `

    const data = {
      status: 200,
      data: post,
    }

    return request.json({ data })
  }

  async create(request: Context) {
    return request.json({ status: 'create' })
  }

  async update(request: Context) {
    return request.json({ status: 'update' })
  }

  async delete(request: Context) {
    return request.json({ status: 'delete' })
  }
}

export default PostController
