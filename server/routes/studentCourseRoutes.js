const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");
const studentMiddleware = require("../middlewares/studentMiddleware");

const studentCourseController = require("../controllers/studentCourseController");

// get courselist
router.get("/", authMiddleware.validation, studentMiddleware.studentValidation, studentCourseController.list);

// add new course
router.post("/", authMiddleware.validation, studentMiddleware.studentValidation, studentCourseController.enroll);

// remove course
router.post("/drop", authMiddleware.validation, studentMiddleware.studentValidation, studentCourseController.drop);

module.exports = router;
