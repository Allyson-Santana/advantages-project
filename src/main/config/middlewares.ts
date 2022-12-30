import { Express } from 'express'
import {
  boryParser,
  cors,
  contentType
} from '../middlewares'

export default (app: Express): void => {
  app.use(boryParser)
  app.use(cors)
  app.use(contentType)
}
