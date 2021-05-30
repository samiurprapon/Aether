const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");
const studentCourseController = require("../controllers/studentCourseController");

// get courselist
router.get("/", authMiddleware.validation, studentCourseController.list);

// add new course
router.post("/", authMiddleware.validation, studentCourseController.enroll);

// remove course
router.post("/drop", authMiddleware.validation, studentCourseController.drop);

module.exports = {
  router,
};
