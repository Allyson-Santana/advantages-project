import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): Boolean {
    return true
  }
}))

describe('Email Validator Adapter', () => {
  test('Should return false if validator returs false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('isvalid_email@gmail.com')
    expect(isValid).toBe(false)
  })

  test('Should return false if validator returs false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('isvalid_email@gmail.com')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpyOn = jest.spyOn(validator, 'isEmail')
    sut.isValid('isvalid_email@gmail.com')
    expect(isEmailSpyOn).toHaveBeenCalledWith('isvalid_email@gmail.com')
  })
})
