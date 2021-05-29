const router = require('express').Router();

const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.validation, studentController.isCompleted);
router.post('/', authMiddleware.validation, studentController.upsert);

module.exports = {
    router
};