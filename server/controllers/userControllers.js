const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const axios = require('axios')

// @desc     Send user details & set token in req.session.token
// @route    POST /api/users/login
// @access   Public
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    try {
        const response = await axios('http://localhost:8080/auth/local', {
            method: 'POST',
            data: {
                email,
                password
            }
        })
    
        const { data } = await response
        console.log('data from /auth/local', data)
        req.jwt = data.token
        req.session.jwt = data.token

        res.status(res.statusCode).json({
            userData: {
                _id: data._id,
                name: data.name,
                instrument: data.instrument,
                isAdmin: data.isAdmin
            }
        })
        
    } catch (error) {
        res.status(res.statusCode)
        throw new Error(error)
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
         const response = await axios('http://localhost:8080/auth/local', {
            method: 'POST',
            data: {
                email,
                password
            }
        })
    
        const { data } = await response
        console.log(data)

        req.session.jwt = data.token
        
        res.status(res.statusCode).json({
            userData: {
                _id: data._id,
                name: data.name,
                instrument: data.instrument,
                isAdmin: data.isAdmin
            }
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
    loginUser,
    registerUser,
    getUserById,
}