const asyncHandler = require('express-async-handler')
const axios = require('axios')
const generateToken = require('../utils/generateToken')

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
        const { data: { userData, token } } = await response
        req.session.jwt = token
        req.jwt = token

        res.status(200).json({
            userData: {
                _id: userData._id,
                name: userData.name,
                email: userData.email,
                instrument: userData.instrument,
                isAdmin: userData.isAdmin
            },
            token: token
        })

    } catch (error) {
        res.status(res.statusCode)
        throw new Error(error)
    }
})

// @desc     Register new user
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async(req, res) => {
    const { email, password, name, instrument, isAdmin } = req.body

    try {
        const response = await axios('http://localhost:8080/auth/register', {
            method: 'POST',
            data: {
                email: email,
                password: password,
                name: name,
                instrument: instrument,
                isAdmin: isAdmin ? isAdmin : false
            }
        })
        const { data: { userData, token } } = await response
        req.session.jwt = token
        req.jwt = token

        res.status(200).json({
            userData: {
                _id: userData._id,
                name: userData.name,
                email: userData.email,
                instrument: userData.instrument,
                isAdmin: userData.isAdmin
            },
            token: token
        })
    } catch (error) {
        res.status(res.statusCode)
        throw new Error(error)
    }
})

// @desc     Get user by ID
// @route    GET /api/users/:id
// @access   Public
const getUserById = asyncHandler(async(req, res) => {
    const token = req.session.jwt ? req.session.jwt : req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : ''
    try {
        const response = await axios(`http://localhost:8080/auth/users/${req.params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const { data } = await response
        res.status(res.statusCode).json(data)
    } catch (error) {
        console.log(error.response.data)
        return error.response.data ? res.status(res.statusCode).send(error.response.data) : new Error(error)
    }
})


module.exports = {
    loginUser,
    registerUser,
    getUserById,
}