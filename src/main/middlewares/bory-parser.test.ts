import request from 'supertest'
import app from '../config/app'

describe('Bory Parser Middleware', () => {
  test('should parser bory as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'allyson' })
      .expect({ name: 'allyson' })
  })
})
