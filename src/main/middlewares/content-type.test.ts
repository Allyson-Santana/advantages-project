import request from 'supertest'
import app from '../config/app'

describe('Bory Parser Middleware', () => {
  test('should return default content type as json', async () => {
    app.get('/test_content_type_json', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test_content_type_json')
      .expect('content-type', /json/)
  })
})

describe('Bory Parser Middleware', () => {
  test('should return xml content when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
