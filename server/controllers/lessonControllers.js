const asyncHandler = require('express-async-handler')
const Lesson = require('../models/lessonModel')
const User = require('../models/userModel')
const axios = require('axios')

// @desc     Create a lesson
// @access   Public
// @route    POST /api/lesson/create
const createLesson = asyncHandler(async(req, res) => {
    const token = req.session.jwt
    console.log(' createLesson - req.session.jwt', token)

    const {
        date,
        time,
        length,
        location,
        price
    } = req.body

    const user = req.body.user ? req.body.user : req.user

    console.log(req.user)
    try {
        const response = await axios('http://localhost:8080/auth/lesson/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: { user, date, time, length, location, price }
        })

        const { data } = await response
        console.log('data form /auth/lesson/create', data)
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

    const findUser = await User.findById(req.params.userId).select('-password')

    findUser.populate('lessons')
    .execPopulate((err, userAndLessons) => {
            if (err) return err

            if (userAndLessons) {
                res.status(res.statusCode).json(userAndLessons)
            } else {
                res.status(404)
                throw new Error('User not found')
            }
    })
})

// @desc     Get one lesson by id associated by a user by ID
// @route    GET /api/lessons/findlesson/:lessonId
// @access   Private
const getLessonById = asyncHandler(async (req, res) => {
    const findLesson = await Lesson.findById(req.params.lessonId)

    if (!findLesson) {
        res.status(404)
        throw new Error('Lesson not found')
    } else {
        res.status(res.statusCode).json(findLesson)
    }
})

module.exports = {
    createLesson,
    getLessonsByUserId,
    getLessonById
}