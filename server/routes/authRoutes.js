const router = require('express').Router();

const { register, login, refresh, deAuth } = require('../controllers/authController');
const { validation } = require('../middlewares/authMiddleware');

router.post('/signup', register);
router.post('/login', login);
router.post('/refresh', validation, refresh);
router.post('/logout', validation, deAuth);

module.exports = router;
