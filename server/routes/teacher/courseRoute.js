const router = require('express').Router();

const { validation } = require('../../middlewares/authMiddleware');
const { isTeacher } = require('../../middlewares/roleMiddleware');

const { add, archived, list, remove, update } = require('../../controllers/courseController');

router.get('/', validation, isTeacher, list); // get courselist
router.post('/', validation, isTeacher, add); // add new course
router.put('/', validation, isTeacher, update); // update course details
router.delete('/', validation, isTeacher, remove); // remove course

router.post('/archive', validation, isTeacher, archived); // archive course after it's done

module.exports = router;
