const router = require('express').Router();

const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.validation, teacherController.isCompleted);
router.post('/', authMiddleware.validation, teacherController.upsert);

module.exports = {
    router
};