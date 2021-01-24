const express = require('express')
const router = express.Router()
const {
    loginUser,
    registerUser,
    getUserById,
} = require('../controllers/userControllers')

router.route('/').post(registerUser)
router.route('/login').post(loginUser)
router.route('/:id').get(getUserById)

module.exports = router