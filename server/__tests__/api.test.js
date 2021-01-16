const server = require('../server')
const request = require('supertest')
const usersInfo = require('../data/users')
const lessons = require('../data/lessons')
const User = require('../models/userModel')
const mongoose = require('mongoose')

//TODO: complete user routes tests, then add lesson routes tests

let userId

describe('Test User Routes', () => {
    it('should register a new user and respond with that user\'s info as json', async(done) => {
        await request(server)
            .post('/api/users')
            .send(usersInfo[2])
            .expect(201)
            .then(resp => {
                userId = resp.body._id
                expect(resp.body.name).toBe(usersInfo[2].name)
                expect(resp.body.email).toBe(usersInfo[2].email)
                expect(resp.body.instrument).toBe(usersInfo[2].instrument)
                done()
            })
            .catch(err => done(err))

    })

    it('should get a user by user id', async(done) => {
        await request(server)
            .get(`/api/users/${userId}`)
            .expect(200)
            .then(resp => {
                expect(resp.body._id).toBe(userId)
                expect(resp.body.email).toBe(usersInfo[2].email)
                done()
            })
            .catch(err => done(err))
    })

    it('should authorize and login a user', async(done) => {
        await request(server)
            .post(`/api/users/login`)
            .send({
                email: usersInfo[2].email,
                password: usersInfo[2].password
            })
            .expect(200)
            .then(resp => {
                expect(resp.body.token).toBeDefined()
                expect(resp.body.name).toBe(usersInfo[2].name)
                expect(resp.body.email).toBe(usersInfo[2].email)
                expect(resp.body.instrument).toBe(usersInfo[2].instrument)
                done()
            })
            .catch(err => done(err))
    })

    afterAll(async(done) => {
        await User.deleteOne({ email: usersInfo[2].email })
        await mongoose.connection.close()
        server.close()
        done()
    })
})

describe('Test Lesson Routes', () => {
    beforeAll(async(done) => {
        const testUser = User.create(usersInfo[2])
        await testUser.save()

        const testUserSaved = await userId.findOne({ email: usersInfo[2].email })
        userId = testUserSaved._id
        lessons[0].user = userId
    })

    it('should create a lesson associated with the user', async(done) => {
        await request(server)
            .post('/api/lesson/create')
            .send(lessons[0])
            .expect(201)
            .then(resp => {
                expect(User.lessons[0]._id).toBe(resp.body._id)
                expect(resp.body._id).toBeDefined()
                expect(resp.body.user).toBe(lessons[0].user)

                expect(new Date(resp.body.date).toISOString())
                    .toBe(new Date(lesson[0].date).toISOString())
                expect(new Date(resp.body.time).toISOString())
                    .toBe(new Date(lessons[0].time).toISOString())

                expect(resp.body.location).toBe(lessons[0].location)
                expect(resp.body.price).toBe(lessons[0].price)

                done()
            })
            .catch(err => done(err))
    })

})