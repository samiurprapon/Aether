const router = require('express').Router();

const { validation } = require('../middlewares/authMiddleware');
const { isStudent } = require('../middlewares/roleMiddleware');

const { reading } = require('../controllers/sessionController');

// student reading endpoint
router.post('/', validation, isStudent, reading);

module.exports = router;
