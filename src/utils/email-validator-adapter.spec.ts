import { EmailValidatorAdapter } from './email-validator-adapter'

describe('Email Validator Adapter', () => {
  test('Should return false if validator returs false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('isvalid_email@gmail.com')
    expect(isValid).toBe(false)
  })
})
