
import { Controller, httpRequest, httpResponse } from '../../presetation/protocols'

/** @Decorator */
export class LogControllerDecorator implements Controller {
  private readonly controller: Controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      console.error('MEU LOG')
    }
    return httpResponse
  }
}
