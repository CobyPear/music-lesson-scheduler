const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async(req, res, next) => {
    console.log(req.session)
    let token
        // token = req.cookies.token || ''
    token = req.cookies.token ?
        req.cookies.token :
        req.headers.authorization && req.headers.authorization.startsWith('Bearer') ?
        req.headers.authorization.split(' ')[1] :
        req.session.jwt ? req.session.jwt :
        ''
        console.log('protect middleware token', token)
    try {
        if (!token) {
            return res.status(401).json('Unauthorized, please login')
        }

        const decrypt = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            id: decrypt.id,
            name: decrypt.name
        }
        req.session.jwt = token
        next()
    } catch (error) {
        console.log(' catch in protect ')
        return res.status(500).json(error)
    }
})

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        req.status(401)
        throw new Error('Not authorized: not admin')
    }
}

module.exports = {
    protect,
    isAdmin
}