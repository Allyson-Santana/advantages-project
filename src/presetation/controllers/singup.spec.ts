import { IvalidParamError } from './errors/invalid-param-error'
import { MissingParamError } from './errors/missing-param-error'
import { EmailValidator } from './protocols/emailValidator'
import { SingUpController } from './singup'

interface SutTypes {
  sut: SingUpController,
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SingUpController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('SingUp Controller', () => {
  test('should return 400 if name no is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'my e-mail',
        passowrd: 'my passowrd',
        passwordConfirmation: 'my passowrdConfirmation'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('should return 400 if email no is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'my name',
        passowrd: 'my passowrd',
        passwordConfirmation: 'my passowrdConfirmation'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if password no is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'my name',
        email: 'my e-mail',
        passwordConfirmation: 'my passowrdConfirmation'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('should return 400 if passwordConfirmation no is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'my name',
        email: 'my e-mail',
        password: 'my password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('should return 400 if invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'my name',
        email: 'my e-mail',
        password: 'my password',
        passwordConfirmation: 'my passwordConfirmation'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new IvalidParamError('email'))
  })
})
