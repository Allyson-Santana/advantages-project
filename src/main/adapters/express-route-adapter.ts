import { Request, Response } from 'express'
import { Controller, httpRequest } from '../../presetation/protocols'

export const adapterRoute = (controller: Controller): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: httpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
