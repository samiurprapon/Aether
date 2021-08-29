const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");
const teacherMiddleware = require("../middlewares/teacherMiddleware");

const courseController = require("../controllers/courseController");

// get courselist
router.get("/", authMiddleware.validation, teacherMiddleware.teacherValidation, courseController.list);

// add new course
router.post("/", authMiddleware.validation, teacherMiddleware.teacherValidation, courseController.add);

// update course details
router.post("/edit", authMiddleware.validation, teacherMiddleware.teacherValidation, courseController.remove);

// remove course
router.post("/remove", authMiddleware.validation, teacherMiddleware.teacherValidation, courseController.remove);

// archive course after it's done
router.post("/archive", authMiddleware.validation, teacherMiddleware.teacherValidation, courseController.archived);

module.exports = {
  router,
};
