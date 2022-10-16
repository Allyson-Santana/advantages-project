import { MissingParamError, IvalidParamError, ServerError } from './errors'
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
        email: 'my_email',
        passowrd: 'my_passowrd',
        passwordConfirmation: 'my_passowrdConfirmation'
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
        name: 'my_name',
        passowrd: 'my_passowrd',
        passwordConfirmation: 'my_passowrdConfirmation'
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
        name: 'my_name',
        email: 'my_email',
        passwordConfirmation: 'my_passowrdConfirmation'
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
        name: 'my_name',
        email: 'my_email',
        password: 'my_password'
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
        name: 'my_name',
        email: 'my_email',
        password: 'my_password',
        passwordConfirmation: 'my passwordConfirmation'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new IvalidParamError('email'))
  })

  test('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'my_name',
        email: 'my_email',
        password: 'my_password',
        passwordConfirmation: 'my passwordConfirmation'
      }
    }

    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('my_email')
  })

  test('should return 500 if EmailValidator throws', () => {
    class EmailValidatorStub implements EmailValidator {
      isValid (email: string): boolean {
        throw new Error()
      }
    }
    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SingUpController(emailValidatorStub)

    const httpRequest = {
      body: {
        name: 'my_name',
        email: 'my_email',
        password: 'my_password',
        passwordConfirmation: 'my passwordConfirmation'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
