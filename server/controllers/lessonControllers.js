const asyncHandler = require('express-async-handler')
const Lesson = require('../models/lessonModel')
const User = require('../models/userModel')

// @desc     Create a lesson
// @access   Public
// @route    POST /api/lesson/create

//TODO lesson controllers
const createLesson = asyncHandler(async (req, res) => {
    const {
        date,
        time,
        length,
        location,
        price
    } = req.body

    const user = req.body.user ? req.body.user : req.user
    console.log(user)

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


module.exports = {
    createLesson
}