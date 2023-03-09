const router = require('express').Router();

const { authentication } = require('../../middlewares/authMiddleware');
const { isTeacher } = require('../../middlewares/roleMiddleware');

const { add, archived, list, remove, update } = require('../../controllers/courseController');

router.get('/', authentication, isTeacher, list); // get courselist
router.post('/', authentication, isTeacher, add); // add new course
router.put('/', authentication, isTeacher, update); // update course details
router.delete('/', authentication, isTeacher, remove); // remove course

router.post('/archive', authentication, isTeacher, archived); // archive course after it's done

module.exports = router;
