const express = require('express')
const router = express.Router()
const {
    authUser,
    registerUser,
    getUserById
} = require('../controllers/userControllers')

router.route('/users/login').post(authUser)
router.route('/users/').post(registerUser)
router.route('users/:id').get(getUserById)

module.exports = router