const router = require('express').Router();

const { validation } = require('../../middlewares/authMiddleware');
const { isStudent } = require('../../middlewares/roleMiddleware');

const { list, enroll, drop } = require('../../controllers/studentCourseController');

router.get('/', validation, isStudent, list); // get courselist
router.post('/', validation, isStudent, enroll); // add new course
router.delete('/', validation, isStudent, drop); // remove course

module.exports = router;
