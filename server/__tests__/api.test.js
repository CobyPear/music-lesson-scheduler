const server = require('../server')
const request = require('supertest')
const usersInfo = require('../data/users')
const User = require('../models/userModel')
const mongoose = require('mongoose')


describe('Test User Routes', () => {
    it('should register a new user and respond with that user\'s info as json', async(done) => {
        await request(server)
            .post('/api/users')
            .send(usersInfo[2])
            .expect(201)
            .then(resp => {
                expect(resp.body.name).toBe(usersInfo[2].name)
                expect(resp.body.email).toBe(usersInfo[2].email)
                expect(resp.body.instrument).toBe(usersInfo[2].instrument)
                done()
            })
            .catch(err => done(err))

    })
})

afterAll(async(done) => {
    await User.deleteMany()
    await mongoose.connection.close()
    server.close()
    done()
})