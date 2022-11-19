const router = require('express').Router();

const { validation } = require('../middlewares/authMiddleware');
const { isStudent } = require('../middlewares/roleMiddleware');

const { isCompleted, details, upsert } = require('../controllers/studentController');

router.get('/valid', validation, isStudent, isCompleted);

router.get('/', validation, isStudent, details);
router.post('/', validation, isStudent, upsert);

module.exports = router;
