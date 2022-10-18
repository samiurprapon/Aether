const router = require('express').Router();

const { validation } = require('../middlewares/authMiddleware');
const { isStudent } = require('../middlewares/roleMiddleware');

const { list, enroll, drop } = require('../controllers/studentCourseController');

// get courselist
router.get('/', validation, isStudent, list);

// add new course
router.post('/', validation, isStudent, enroll);

// remove course
router.post('/drop', validation, isStudent, drop);

module.exports = router;
