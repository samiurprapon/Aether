const router = require('express').Router();

const { validation } = require('../middlewares/authMiddleware');
const { docsUploader } = require('../middlewares/fileUploadMiddleware');

const { list, remove, upload } = require('../controllers/slideController');

router.get('/', validation, list); // get courselist
router.post('/', validation, docsUploader, upload); // add new slide
router.delete('/', validation, remove); // remove slide

module.exports = router;
