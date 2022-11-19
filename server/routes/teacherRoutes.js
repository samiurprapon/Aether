const router = require('express').Router();

const { validation } = require('../middlewares/authMiddleware');
const { isTeacher } = require('../middlewares/roleMiddleware');

const { isCompleted, upsert, details } = require('../controllers/teacherController');

router.get('/valid', validation, isTeacher, isCompleted);
router.post('/', validation, upsert);
router.get('/', validation, details);

module.exports = router;
