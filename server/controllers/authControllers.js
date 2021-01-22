const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Lesson = require('../models/lessonModel')
const generateToken = require('../utils/generateToken')

const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    console.log(email, password)

    const user = await User.findOne({ email })
    console.log('authUser, user', user)

    if (user && (await user.matchPassword(password))) {

        // send the token in a cookie
        const { token, expiration } = await generateToken(user._id, user.name)

        res.status(res.statusCode)
            .json({
                _id: user._id,
                name: user.name,
                email: user.email,
                instrument: user.instrument,
                isAdmin: user.isAdmin,
                token: token
            })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const authCreateLesson = asyncHandler(async(req, res) => {
    const token = req.session.jwt
    console.log('req.session.jwt - authCreateLesson', token)

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


// TODO: add the rest of the proxy routes

module.exports = { authUser, authCreateLesson }