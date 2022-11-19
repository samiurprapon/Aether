const router = require('express').Router();

const authRoutes = require('./authRoutes');
const studentRoutes = require('./studentRoutes');
const teacherRoutes = require('./teacherRoutes');
const courseRoutes = require('./courseRoutes');
const sessionRoutes = require('./sessionRoutes');
const slideRoutes = require('./slideRoutes');
const studentCourseRoutes = require('./studentCourseRoutes');

router.use('/auth', authRoutes);

router.use('/student', studentRoutes);
router.use('/student/course', studentCourseRoutes);

router.use('/common/course/slide', slideRoutes);
router.use('/common/course/session', sessionRoutes);

router.use('/teacher', teacherRoutes);
+router.use('/teacher/course', courseRoutes);

module.exports = router;
