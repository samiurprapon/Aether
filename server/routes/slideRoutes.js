const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");
const slideController = require("../controllers/slideController");

// get courselist
router.get("/", authMiddleware.validation, slideController.list);

// add new slide
router.post("/", authMiddleware.validation, slideController.upload);

// remove slide
router.post("/remove", authMiddleware.validation, slideController.remove);

module.exports = router;
