import { AddAccount } from './domain/usecase/add-account'
import { MissingParamError, IvalidParamError } from './errors'
import { badRequest, serverError } from './helpers/http-helper'
import { Controller, EmailValidator, httpRequest, httpResponse } from './protocols'

export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: httpRequest): httpResponse {
    try {
      const requireField = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requireField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new IvalidParamError('passwordConfirmation'))
      }

      const isvalidEmail = this.emailValidator.isValid(email)
      if (!isvalidEmail) {
        return badRequest(new IvalidParamError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError()
    }
  }
}
