const router = require("express").Router();

const studentController = require("../controllers/studentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/valid", authMiddleware.validation, studentController.isCompleted);

router.get("/", authMiddleware.validation, studentController.details);
router.post("/", authMiddleware.validation, studentController.upsert);

module.exports = router;