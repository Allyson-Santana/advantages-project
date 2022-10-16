import { MissingParamError } from './errors/missing-param-error'
import { SingUpController } from './singup'

describe('SingUp Controller', () => {
  test('should return 400 if name no is provided', () => {
    const sut = new SingUpController()

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
})

describe('SingUp Controller', () => {
  test('should return 400 if email no is provided', () => {
    const sut = new SingUpController()

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
})

describe('SingUp Controller', () => {
  test('should return 400 if password no is provided', () => {
    const sut = new SingUpController()

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
})

describe('SingUp Controller', () => {
  test('should return 400 if passwordConfirmation no is provided', () => {
    const sut = new SingUpController()

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
})
