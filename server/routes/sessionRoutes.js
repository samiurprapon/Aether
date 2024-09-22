const router = require('express').Router();

const { validation } = require('../middlewares/authMiddleware');
const { isStudent } = require('../middlewares/roleMiddleware');

const { reading } = require('../controllers/sessionController');

router.post('/', validation, isStudent, reading); // student reading endpoint

module.exports = router;
