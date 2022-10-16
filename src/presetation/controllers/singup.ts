import { IvalidParamError } from './errors/invalid-param-error'
import { MissingParamError } from './errors/missing-param-error'
import { ServerError } from './errors/server-error'
import { badRequest } from './helpers/http-helper'
import { Controller } from './protocols/controller'
import { EmailValidator } from './protocols/emailValidator'
import { httpRequest, httpResponse } from './protocols/http'

export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: httpRequest): httpResponse {
    try {
      const requireField = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requireField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isvalidEmail = this.emailValidator.isValid(httpRequest.body.email)
      if (!isvalidEmail) {
        return badRequest(new IvalidParamError('email'))
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
