const router = require('express').Router();

const { validation } = require('../middlewares/authMiddleware');
const { isTeacher } = require('../middlewares/roleMiddleware');

const { add, archived, list, remove, update } = require('../controllers/courseController');

// get courselist
router.get('/', validation, isTeacher, list);

// add new course
router.post('/', validation, isTeacher, add);

// update course details
router.post('/edit', validation, isTeacher, remove);

// remove course
router.post('/remove', validation, isTeacher, remove);

// archive course after it's done
router.post('/archive', validation, isTeacher, archived);

module.exports = router;
