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
  })
})
