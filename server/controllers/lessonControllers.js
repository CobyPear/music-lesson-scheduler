const asyncHandler = require('express-async-handler')
const Lesson = require('../models/lessonModel')
const User = require('../models/userModel')

// @desc     Create a lesson
// @access   Public
// @route    POST /api/lesson/create

//TODO lesson controllers
const createLesson = asyncHandler(async(req, res) => {
    const {
        date,
        time,
        length,
        location,
        price
    } = req.body

    const user = req.body.user ? req.body.user : req.user
    console.log(req.user)

    const lesson = await Lesson.create({
        user: user,
        date: date,
        time: time,
        length: length,
        location: location,
        price: price
    })

    await lesson.save()

    if (lesson) {
        const associatedUser = await User.findOne({ _id: user })
        await associatedUser.lessons.push(lesson._id)
        await associatedUser.save()

        res.status(res.statusCode).json({
            _id: lesson._id,
            user: lesson.user,
            date: lesson.date,
            time: lesson.time,
            length: lesson.length,
            location: lesson.location,
            price: lesson.price,
            associatedUser
        })
    } else {
        res.status(400).json({ error: error.message })
        throw new Error('Lesson not created, bad request')
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