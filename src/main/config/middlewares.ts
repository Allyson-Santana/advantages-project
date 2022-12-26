import { Express } from 'express'
import { boryParser } from '../middlewares/bory-parser'
import { cors } from '../middlewares/cors'
import { contentType } from '../middlewares/content-type'

export default (app: Express): void => {
  app.use(boryParser)
  app.use(cors)
  app.use(contentType)
}
