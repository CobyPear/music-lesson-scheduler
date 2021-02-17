const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Lesson = require('../models/lessonModel')
const generateToken = require('../utils/generateToken')

// @desc     Authorize a user, send back user details and jwt token
// @route    POST /auth/local
// @access   Private
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        // send the token in a cookie
        const { token } = await generateToken(user._id, user.name)

        res.status(res.statusCode)
            .json({
                userData: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    instrument: user.instrument,
                    isAdmin: user.isAdmin
                },
                token: token
            })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc     Register new user
// @route    POST /auth/register
// @access   Public
const authRegisterUser = asyncHandler(async(req, res) => {
    const { email, password, name, instrument, isAdmin } = req.body
    try {
        const userExists = await User.findOne({ email })

        if (userExists) {
            res.status(400)
            throw new Error('User already exists')
        }
        const user = await User.create({
            name: name,
            email: email,
            password: password,
            instrument: instrument,
            isAdmin: isAdmin ? isAdmin : false
        })
        if (user) {
            const { token } = await generateToken(user._id, user.name)

            res.status(201)
                .json({
                    userData: {
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                        instrument: user.instrument,
                        isAdmin: user.isAdmin
                    },
                    token: token
                })
        } else {
            res.status(400)
            throw new Error('Invalid email or password')

        }
    } catch (error) {
        res.status(res.statusCode)
        throw new Error(error)
    }

})

// @desc     Get user by ID
// @route    GET /auth/users/:id
// @access   Private /(maybe make this Admin only route later)
const authGetUserById = asyncHandler(async(req, res) => {
    const user = await (await User.findById(req.params.id).select('-password'))
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc     Schedule a lesson
// @route    POST /auth/lesson/create
// @access   Private
const authCreateLesson = asyncHandler(async(req, res) => {
    const {
        date,
        time,
        length,
        location,
        price
    } = req.body
    const user = req.body.user.id || req.user.id

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
        res.status(400)
        throw new Error('Lesson not created, bad request')
    }
})


// TODO: add the rest of the proxy routes

// @desc     Get one lesson by id associated by a user by ID
// @route    GET /auth/lesson/:userId/
// @access   Private
const authGetLessonsByUserId = asyncHandler(async(req, res) => {
    (await User.findById(req.params.userId).select('-password'))
    .populate({ path: 'lessons' })
        .execPopulate((err, userAndLessons) => {
            if (err) return err
            if (userAndLessons) {
                const { lessons } = userAndLessons
                res.status(res.statusCode).json(lessons)
            } else {
                res.status(404)
                throw new Error('User not found')
            }
        })
})

// @desc     Get one lesson by id associated by a user by ID
// @route    GET /auth/findlesson/:lessonId
// @access   Private
const authGetLessonById = asyncHandler(async(req, res) => {
    const findLesson = await Lesson.findById(req.params.lessonId)
    if (!findLesson) {
        res.status(404)
        throw new Error('Lesson not found')
    } else {
        res.status(res.statusCode).json(findLesson)
    }
})

// @desc     Mark lesson as paid
// @route    PUT /auth/lesson/paid/:lessonId
// @access   Private
const authMarkLessonAsPaid = asyncHandler(async(req,res) => {
    const lessonId = req.params.lessonId
    Lesson.findOneAndUpdate({ _id: lessonId}, { isPaid: true}, (err) => {
        if (err) {
            res.status(res.statusCode)
            throw new Error(err)
        }
        res.status(res.statusCode).json({ message: 'Lesson marked as paid'})
    })
})

module.exports = { authUser, authRegisterUser, authCreateLesson, authGetUserById, authGetLessonsByUserId, authGetLessonById, authMarkLessonAsPaid }