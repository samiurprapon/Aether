const router = require('express').Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authMiddleware.authentication, authController.refresh);
router.post('/logout', authMiddleware.validation, authController.deAuth);

module.exports = {
    router
};