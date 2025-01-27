import { Hono } from 'hono'
import PostController from '../app/controllers/post/post_controller'

const api = new Hono()

const postController = new PostController()
api.get('/posts', postController.index)
api.get('/posts/:id', postController.show)
api.post('/posts', postController.create)
api.put('/posts/:id', postController.update)
api.delete('/posts/:id', postController.delete)

export default api
