const { app } = require('../app')
const request = require('supertest')
const usersInfo = require('../data/users')

describe('GET /api/user/', () => {
    it('should register a new user and respond with that user\'s info as json', async () => {
        request(app)
            .post('/api/user/')
            .send(usersInfo[2])

    })
})