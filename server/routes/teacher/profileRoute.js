const router = require('express').Router();

const { authentication } = require('../../middlewares/authMiddleware');
const { isTeacher } = require('../../middlewares/roleMiddleware');

const { isCompleted, upsert, details } = require('../../controllers/teacherController');

router.get('/valid', authentication, isTeacher, isCompleted);
router.post('/', authentication, upsert);
router.get('/', authentication, details);

module.exports = router;
