import { Express } from 'express'
import { boryParser } from '../middlewares/bory-parser'
import { cors } from '../middlewares/cors'

export default (app: Express): void => {
  app.use(boryParser)
  app.use(cors)
}
