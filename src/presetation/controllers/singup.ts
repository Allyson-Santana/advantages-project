import { MissingParamError, IvalidParamError } from './errors'
import { badRequest, serverError } from './helpers/http-helper'
import { Controller, EmailValidator, httpRequest, httpResponse } from './protocols'

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

      const { password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new IvalidParamError('passwordConfirmation'))
      }

      const isvalidEmail = this.emailValidator.isValid(httpRequest.body.email)
      if (!isvalidEmail) {
        return badRequest(new IvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
