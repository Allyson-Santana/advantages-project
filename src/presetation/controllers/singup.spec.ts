import { SingUpController } from './singup'

describe('SingUp Controller', () => {
  test('should return 400 if name no is provided', () => {
    const sut = new SingUpController()

    const httpRequest = {
      body: {
        email: 'my e-mail',
        passowrd: 'my passowrd',
        passowrdConfirmation: 'my passowrdConfirmation'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
})

describe('SingUp Controller', () => {
  test('should return 400 if email no is provided', () => {
    const sut = new SingUpController()

    const httpRequest = {
      body: {
        name: 'my name',
        passowrd: 'my passowrd',
        passowrdConfirmation: 'my passowrdConfirmation'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: e-mail'))
  })
})
