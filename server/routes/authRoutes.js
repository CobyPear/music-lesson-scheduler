const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { authUser, authCreateLesson } = require('../controllers/authControllers')

router.route('/local').post(authUser)
router.route('/lesson/create').post(protect, authCreateLesson)

module.exports = router