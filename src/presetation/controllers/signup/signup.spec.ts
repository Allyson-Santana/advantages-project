import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../domain/usecase/add-account'
import { MissingParamError, IvalidParamError, ServerError } from '../../errors'
import { EmailValidator } from '../../protocols/email-validator'
import { SignUpController } from './signup'

interface SutTypes {
  sut: SignUpController,
  emailValidatorStub: EmailValidator,
  addAccountStub: AddAccount
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_my_id',
        name: 'valid_my_name',
        email: 'valid_my_email',
        password: 'valid_my_password'
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)

  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

describe('SignUp Controller', () => {
  test('should return 400 if name no is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'my_email',
        passowrd: 'my_passowrd',
        passwordConfirmation: 'my_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('should return 400 if email no is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'my_name',
        passowrd: 'my_passowrd',
        passwordConfirmation: 'my_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if password no is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'my_name',
        email: 'my_email',
        passwordConfirmation: 'my_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('should return 400 if passwordConfirmation no is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'my_name',
        email: 'my_email',
        password: 'my_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('should return 400 if password confirmation is fails', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'my_name',
        email: 'my_email',
        password: 'my_password',
        passwordConfirmation: 'my_passowrdConfirmation'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new IvalidParamError('passwordConfirmation'))
  })

  test('should return 400 if invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'my_name',
        email: 'my_email',
        password: 'my_password',
        passwordConfirmation: 'my_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new IvalidParamError('email'))
  })

  test('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'my_name',
        email: 'my_email',
        password: 'my_password',
        passwordConfirmation: 'my_password'
      }
    }

    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('my_email')
  })

  test('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        name: 'my_name',
        email: 'my_email',
        password: 'my_password',
        passwordConfirmation: 'my_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should call EmailValidator with correct email', async () => {
    const { sut, addAccountStub } = makeSut()

    const addSpy = jest.spyOn(addAccountStub, 'add')

    const httpRequest = {
      body: {
        name: 'my_name',
        email: 'my_email',
        password: 'my_password',
        passwordConfirmation: 'my_password'
      }
    }

    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'my_name',
      email: 'my_email',
      password: 'my_password'
    })
  })

  test('should return 500 if AddAcount throws', async () => {
    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })

    const httpRequest = {
      body: {
        name: 'my_name',
        email: 'my_email',
        password: 'my_password',
        passwordConfirmation: 'my_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should return 200 if valid date is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_my_name',
        email: 'valid_my_email',
        password: 'valid_my_password',
        passwordConfirmation: 'valid_my_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({
      id: 'valid_my_id',
      name: 'valid_my_name',
      email: 'valid_my_email',
      password: 'valid_my_password'
    })
  })
})
