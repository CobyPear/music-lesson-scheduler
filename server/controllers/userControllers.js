const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {

        // send the token in a cookie
        await generateToken(res, user._id, user._name)

        res.status(res.statusCode).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            instrument: user.instrument,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc     Register new user
// @route    POST /api/users/
// @access   Public
const registerUser = asyncHandler(async(req, res) => {
    const { email, password, name, instrument, isAdmin } = req.body

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

        // send the token in a cookie
        await generateToken(res, user._id, user._name)
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            instrument: user.instrument,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(400)
        throw new Error('Invalid email or password')

    }
})

// @desc     Get user by ID
// @route    GET /api/users/:id
// @access   Private/Admin
const getUserById = asyncHandler(async(req, res) => {
    const user = await (await User.findById(req.params.id).select('-password'))
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

module.exports = {
    authUser,
    registerUser,
    getUserById
}