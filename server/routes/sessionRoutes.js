const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");
const sessionController = require("../controllers/sessionController");

// student reading endpoint
router.post("/", authMiddleware.validation, sessionController.reading);

module.exports = router;
