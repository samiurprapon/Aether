const router = require('express').Router();

const authMiddleware = require('../middlewares/authMiddleware');
const courseController = require('../controllers/courseController');

// get courselist
router.get('/', authMiddleware.validation, courseController.list);

// add new course
router.post('/', authMiddleware.validation, courseController.add);

// update course details
router.post('/edit', authMiddleware.validation, courseController.remove);

// remove course
router.post('/remove', authMiddleware.validation, courseController.remove);

// archive course after it's done
router.post('/archive', authMiddleware.validation, courseController.archived);


module.exports = {
    router
};
