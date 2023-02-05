const router = require('express').Router();

const authRoutes = require('./auth');
const studentRoutes = require('./student');
const teacherRoutes = require('./teacher');

const sessionRoutes = require('./sessionRoutes');
const slideRoutes = require('./slideRoutes');

router.use('/auth', authRoutes);

router.use('/student', studentRoutes);
router.use('/teacher', teacherRoutes);

router.use('/common/course/slide', slideRoutes);
router.use('/common/course/session', sessionRoutes);


module.exports = router;
