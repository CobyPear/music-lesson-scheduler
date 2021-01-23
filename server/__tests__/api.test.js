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
let lessonId
let sessionToken

describe('Test User Routes', () => {
    // before we test user routes, we need to create and login a user to test get user by id
    beforeAll(async(done) => {
        try {
            connectDB()
            await request(server)
                .post('/api/users')
                .send(usersInfo[1])
                .expect(200)
                .then(resp => {
                    const { userData, token } = resp.body
                    userId = userData._id
                    sessionToken = token
                        // console.log('created user info and token, ',userData, sessionToken)

                    expect(userData.name).toBe(usersInfo[1].name)
                    expect(userData.email).toBe(usersInfo[1].email)
                    expect(userData.instrument).toBe(usersInfo[1].instrument)
                    expect(token).toBeDefined()
                    expect(resp.headers['set-cookie']).toBeDefined()
                    done()
                })
                .catch(err => done(err))
        } catch (error) {
            done(error)
        }
        done()
    })

    it('should register a new user and respond with that user\'s info as json', async(done) => {
        await request(server)
            .post('/api/users')
            .send(usersInfo[2])
            .expect(200)
            .then(resp => {
                const { userData, token } = resp.body

                expect(userData.name).toBe(usersInfo[2].name)
                expect(userData.email).toBe(usersInfo[2].email)
                expect(userData.instrument).toBe(usersInfo[2].instrument)
                expect(token).toBeDefined()
                expect(resp.headers['set-cookie']).toBeDefined()
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
                const { userData, token } = resp.body
                expect(userData.name).toBe(usersInfo[2].name)
                expect(userData.email).toBe(usersInfo[2].email)
                expect(userData.instrument).toBe(usersInfo[2].instrument)
                expect(resp.headers['set-cookie']).toBeDefined()
                expect(token).toBeDefined
                done()
            })
            .catch(err => done(err))
    })

    it('should get a user by user id', async(done) => {
        await request(server)
            .get(`/api/users/${userId}`)
            .auth(sessionToken, { type: 'bearer' })
            .expect(200)
            .then(resp => {
                expect(resp.body._id).toBe(userId)
                expect(resp.body.email).toBe(usersInfo[1].email)
                done()
            })
            .catch(err => done(err))
    })

    it('should login a user and send back user details and a jwt token', async(done) => {
        await request(server)
            .post('/auth/local')
            .send({
                email: usersInfo[1].email,
                password: usersInfo[1].password
            })
            .expect(200)
            .then(resp => {
                const { userData, token } = resp.body

                expect(JSON.stringify(userData._id)).toBe(JSON.stringify(userId))
                expect(userData.email).toBe(usersInfo[1].email)
                expect(userData.name).toBe(usersInfo[1].name)
                expect(userData.instrument).toBe(usersInfo[1].instrument)
                expect(userData.isAdmin).toBe(usersInfo[1].isAdmin)
                expect(token).toBeDefined()
                done()
            })
            .catch(err => done(err))
    })

    afterAll(async(done) => {
        try {
            await User.deleteOne({ email: usersInfo[1].email })
            await User.deleteOne({ email: usersInfo[2].email })
            await mongoose.connection.close()
            server.close()
            done()

        } catch (error) {
            done(error)
        }
        done()
    })
})

describe('Test Lesson Routes', () => {
    beforeAll(async(done) => {
        try {
            await request(server)
                .post('/api/users')
                .send(usersInfo[3])
                .expect(200)
                .then(resp => {
                    const { userData, token } = resp.body
                        // set userId, lessonsInfo, and sessionToken for use later
                    userId = userData._id
                    lessonsInfo[0].user = userId
                    sessionToken = token

                    expect(userData.name).toBe(usersInfo[3].name)
                    expect(userData.email).toBe(usersInfo[3].email)
                    expect(userData.instrument).toBe(usersInfo[3].instrument)
                    expect(token).toBeDefined()
                    expect(resp.headers['set-cookie']).toBeDefined()
                    done()
                })
                .catch(err => done(err))
        } catch (error) {
            done(error)
        }
        done()
    })

    it('should create a lesson associated with the user', async(done) => {
        await request(server)
            .post('/api/lessons/create')
            .send(lessonsInfo[0])
            .auth(sessionToken, { type: 'bearer' })
            .expect(200)
            .then(async(resp) => {
                let createdLesson = resp.body
                    // save lessonId to use in the next test and to delete it on teardown
                lessonId = createdLesson._id

                expect(createdLesson._id).toBeDefined()
                expect(createdLesson.associatedUser.lessons[0]).toBe(createdLesson._id)
                expect(createdLesson.user).toBe(lessonsInfo[0].user.toString())
                expect(new Date(createdLesson.date).toISOString())
                    .toBe(new Date(lessonsInfo[0].date).toISOString())
                expect(createdLesson.time).toBe(lessonsInfo[0].time)
                expect(createdLesson.location).toBe(lessonsInfo[0].location)
                expect(createdLesson.price).toBe(lessonsInfo[0].price)
                done()
            })
            .catch(err => done(err))
    })

    // This is sort of a user route, but since it requires a lesson to be associated with the user before being tested, the test will fall under the Lesson Routes tests
    it('should find all lessons associated with a user', async(done) => {
        await request(server)
            .get(`/api/lessons/${userId}`)
            .auth(sessionToken, { type: 'bearer' })
            .expect(200)
            .then(async(resp) => {
                let user = resp.body
                let lesson = resp.body.lessons[0]

                expect(JSON.stringify(userId)).toStrictEqual(JSON.stringify(lesson.user))
                expect(JSON.stringify(user._id)).toStrictEqual(JSON.stringify(userId))
                expect(lesson._id).toStrictEqual(lessonId)
                expect(new Date(lesson.date).toLocaleDateString()).toStrictEqual(lessonsInfo[0].date)
                expect(lesson.time).toBe(lessonsInfo[0].time)
                expect(lesson.length).toBe(lessonsInfo[0].length)
                expect(lesson.price).toBe(lessonsInfo[0].price)
                expect(lesson.confirmed).toBe(false)
                expect(lesson.isPaid).toBe(false)
                expect(lesson.isCanceled).toBe(false)
                expect(lesson.isRescheduled).toBe(false)
                done()
            })
            .catch(err => done(err))
    })

    it('should find the lesson by id and return it', async(done) => {
        await request(server)
            .get(`/api/lessons/findlesson/${lessonId}`)
            .auth(sessionToken, { type: 'bearer' })
            .expect(200)
            .then(resp => {
                const lesson = resp.body
                expect(lesson._id).toBe(lessonId)
                expect(JSON.stringify(lesson.user)).toBe(JSON.stringify(userId))
                expect(lesson.time).toBe(lessonsInfo[0].time)
                expect(lesson.length).toBe(lessonsInfo[0].length)
                expect(lesson.price).toBe(lessonsInfo[0].price)
                expect(lesson.confirmed).toBe(false)
                expect(lesson.isPaid).toBe(false)
                expect(lesson.isCanceled).toBe(false)
                expect(lesson.isRescheduled).toBe(false)
                done()
            })
            .catch(err => done(err))
    })

    afterAll(async(done) => {
        try {
            await User.deleteOne({ email: usersInfo[3].email })
            await Lesson.deleteOne({ lessonId })
            await mongoose.connection.close()
            server.close()
            done()
        } catch (error) {
            console.log('afterAll() error: ', error)
            done(error)
        }
    })
})