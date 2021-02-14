const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createLesson, getLessonsByUserId, getLessonById, markLessonAsPaid } = require('../controllers/lessonControllers')

router.route('/create').post(protect, createLesson)
router.route('/:userId').get(protect, getLessonsByUserId)
router.route('/findlesson/:lessonId').get(protect, getLessonById)
router.route('/paid/:lessonId').put(protect, markLessonAsPaid)

module.exports = router