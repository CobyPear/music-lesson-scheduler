const asyncHandler = require('express-async-handler')
const Lesson = require('../models/lessonModel')

// @desc     Create a lesson
// @access   Public
// @route    POST /api/lesson/create

//TODO lesson controllers
const createLesson = asyncHandler(async (req, res) => {
    const {
        user,
        date,
        time,
        length,
        location,
        price
    } = req.body

    const lesson = await Lesson.create({
        user: user,
        date: date,
        time: time,
        length: length,
        location: location,
        price: price
    })
})