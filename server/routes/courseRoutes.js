const router = require('express').Router();

const authMiddleware = require('../middlewares/authMiddleware');
const courseController = require('../controllers/courseController');

// get courselist
router.get('/', authMiddleware.validation, courseController.addCourse);

// add new course
// router.post('/', authMiddleware.validation, courseController.list);

module.exports = {
    router
};
