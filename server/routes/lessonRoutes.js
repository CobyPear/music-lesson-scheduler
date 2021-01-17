const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createLesson } = require('../controllers/lessonControllers')

router.route('/create').post(protect, createLesson)

module.exports = router