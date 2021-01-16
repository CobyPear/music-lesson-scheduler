const express = require('express')
const router = express.Router()
const {
    authUser,
    registerUser,
    getUserById
} = require('../controllers/userControllers')

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/:id').get(getUserById)

module.exports = router