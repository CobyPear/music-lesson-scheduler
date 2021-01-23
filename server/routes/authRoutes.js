const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { authUser, authCreateLesson, authGetUserById, authRegisterUser, authGetLessonsByUserId, authGetLessonById } = require('../controllers/authControllers')

router.route('/local').post(authUser)
router.route('/register').post(authRegisterUser)
router.route('/users/:id').get(protect, authGetUserById)
router.route('/lesson/create').post(protect, authCreateLesson)
router.route('/lesson/:userId').get(protect, authGetLessonsByUserId)
router.route('/findlesson/:lessonId').get(protect, authGetLessonById)


module.exports = router