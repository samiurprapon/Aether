const router = require('express').Router();

const { authentication } = require('../../middlewares/authMiddleware');
const { isStudent } = require('../../middlewares/roleMiddleware');

const { list, enroll, drop } = require('../../controllers/studentCourseController');

router.get('/', authentication, isStudent, list); // get courselist
router.post('/', authentication, isStudent, enroll); // add new course
router.delete('/', authentication, isStudent, drop); // remove course

module.exports = router;
