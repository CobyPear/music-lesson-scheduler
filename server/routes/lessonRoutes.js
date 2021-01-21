const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createLesson, getLessonsByUserId, getLessonById } = require('../controllers/lessonControllers')

router.route('/create').post(protect, createLesson)
router.route('/:userId').get(protect, getLessonsByUserId)
router.route('/findlesson/:lessonId').get(protect, getLessonById)

module.exports = router