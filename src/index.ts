import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono()
app.use(logger())
app.use(cors())
app.use(prettyJSON())

app.get('/', (c) => {
  return c.json({ status: 'server is running' })
})

export default app
