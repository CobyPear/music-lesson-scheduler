const asyncHandler = require('express-async-handler')
const Lesson = require('../models/lessonModel')
const User = require('../models/userModel')
const axios = require('axios')

// @desc     Create a lesson
// @access   Public
// @route    POST /api/lesson/create
const createLesson = asyncHandler(async(req, res) => {
    const token = req.session.jwt ? req.session.jwt : req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : ''

    const {
        date,
        time,
        length,
        location,
        price
    } = req.body

    const user = req.user ? req.user.id : req.body.user

    try {
        const response = await axios('http://localhost:8080/auth/lesson/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: { user, date, time, length, location, price }
        })

        const { data } = await response
        res.status(res.statusCode).json(data)

    } catch (error) {
        res.status(res.statusCode)
        throw new Error(error)
    }
})

// @desc     Get Lessons associated by a user by ID
// @route    GET /api/lessons/:userId
// @access   Private
const getLessonsByUserId = asyncHandler(async(req, res) => {
    const userId = req.params.userId
    const token = req.session.jwt ? req.session.jwt : req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : ''

    try {
        const response = await axios(`http://localhost:8080/auth/lesson/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const { data } = await response
        res.status(res.statusCode).json(data)
    } catch (error) {
        console.log(error)
        res.status(res.statusCode)
        throw new Error(error)
    }


})

// @desc     Get one lesson by id associated by a user by ID
// @route    GET /api/lessons/findlesson/:lessonId
// @access   Private
const getLessonById = asyncHandler(async(req, res) => {
    const lessonId = req.params.lessonId
    const token = req.session.jwt ? req.session.jwt : req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : ''

    try {
        const response = await axios(`http://localhost:8080/auth/findlesson/${lessonId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const { data } = await response
        res.status(res.statusCode).json(data)
    } catch (error) {
        res.status(404)
        throw new Error('Lesson not found')
    }
})

// @desc     Mark lesson as paid
// @route    PUT /api/lessons/paid/:lessonId
// @access   Private
const markLessonAsPaid = asyncHandler(async(req,res) => {
    const lessonId = req.params.lessonId
    const token = req.session.jwt ? req.session.jwt : req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : ''

    try {
        const response = await axios(`http://localhost:8080/auth/lesson/paid/${lessonId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const { data } = await response
        res.status(res.statusCode).json(data)
    } catch (error) {
        res.status(res.statusCode)
        throw new Error(error)
    }

})
module.exports = {
    createLesson,
    getLessonsByUserId,
    getLessonById,
    markLessonAsPaid
}