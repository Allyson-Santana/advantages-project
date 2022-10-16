import { httpRequest, httpResponse } from './protocols/http'

export class SingUpController {
  handle (httpRequest: httpRequest): httpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: e-mail')
      }
    }
  }
}
