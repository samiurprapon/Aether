const router = require('express').Router();

const { register, login, refresh, deAuth } = require('../controllers/authController');
const { authentication, validation } = require('../middlewares/authMiddleware');

router.post('/signup', register);
router.post('/login', login);
router.post('/refresh', authentication, refresh);
router.post('/logout', validation, deAuth);

module.exports = router;
