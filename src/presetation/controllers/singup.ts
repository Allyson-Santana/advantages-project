import { MissingParamError } from './errors/missing-param-error'
import { badRequest } from './helpers/http-helper'
import { httpRequest, httpResponse } from './protocols/http'

export class SingUpController {
  handle (httpRequest: httpRequest): httpResponse {
    const requireField = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requireField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
