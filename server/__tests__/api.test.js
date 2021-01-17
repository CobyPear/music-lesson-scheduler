const server = require('../server')
const request = require('supertest')
const usersInfo = require('../data/users')
const lessonsInfo = require('../data/lessons')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const Lesson = require('../models/lessonModel')
const connectDB = require('../config/db')

//TODO: complete user routes tests, then add lesson routes tests

let userId
let token
let lessonId

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
        try {
            connectDB()
            const testUser = await User.create(usersInfo[2])
            await testUser.save()

            const testUserSaved = await User.findOne({ email: usersInfo[2].email })
            userId = testUserSaved._id
            lessonsInfo[0].user = userId

            const response = await request(server)
            .post(`/api/users/login`)
            .send({
                email: usersInfo[2].email,
                password: usersInfo[2].password
            })
            token = await response.body.token
            done()
        } catch (error) {
            done(error)
        }
    })

    it('should create a lesson associated with the user', async(done) => {
        await request(server)
            .post('/api/lessons/create')
            .auth(token, {type: 'bearer'})
            .send(lessonsInfo[0])
            .expect(200)
            .then(async (resp) => {

                expect(resp.body._id).toBeDefined()
                expect(resp.body.associatedUser.lessons[0]).toBe(resp.body._id)
                expect(resp.body.user).toBe(lessonsInfo[0].user.toString())
                expect(new Date(resp.body.date).toISOString())
                    .toBe(new Date(lessonsInfo[0].date).toISOString())
                expect(resp.body.time).toBe(lessonsInfo[0].time)
                expect(resp.body.location).toBe(lessonsInfo[0].location)
                expect(resp.body.price).toBe(lessonsInfo[0].price)

                done()
            })
            .catch(err => done(err))
    })

    // TODO: tests for get all lessons for a user, get all lessons, search/filter queries
    it('should find all lessons associated with a user')

    afterAll(async(done) => {
        await User.deleteOne({ email: usersInfo[2].email })
        await Lesson.deleteOne({ _id: lessonId })
        await mongoose.connection.close()
        server.close()
        done()
    })

})