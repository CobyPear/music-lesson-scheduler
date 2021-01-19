const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createLesson, getLessonsByUserId } = require('../controllers/lessonControllers')

router.route('/create').post(protect, createLesson)
router.route('/:userId').get(protect, getLessonsByUserId)

module.exports = router