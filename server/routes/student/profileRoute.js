const router = require('express').Router();

const { authentication } = require('../../middlewares/authMiddleware');
const { isStudent } = require('../../middlewares/roleMiddleware');

const { isCompleted, details, upsert } = require('../../controllers/studentController');

router.get('/valid', authentication, isStudent, isCompleted);
router.get('/', authentication, isStudent, details);
router.post('/', authentication, isStudent, upsert);

module.exports = router;
