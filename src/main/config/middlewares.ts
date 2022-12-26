import { Express } from 'express'
import { boryParser } from '../middlewares/bory-parser'

export default (app: Express): void => {
  app.use(boryParser)
}
