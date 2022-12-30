import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'meunome',
        email: 'meunome@gmail.com',
        password: 'minhasenha123',
        passwordConfirmation: 'minhasenha123'
      })
      .expect(201)
  })
})
