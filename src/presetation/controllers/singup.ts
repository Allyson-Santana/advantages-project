import { MissingParamError } from './errors/missing-param-error'
import { badRequest } from './helpers/http-helper'
import { Controller } from './protocols/controller'
import { httpRequest, httpResponse } from './protocols/http'

export class SingUpController implements Controller {
  handle (httpRequest: httpRequest): httpResponse {
    const requireField = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requireField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
