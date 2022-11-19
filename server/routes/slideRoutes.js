const router = require('express').Router();

const { validation } = require('../middlewares/authMiddleware');
const { docsUploader } = require('../middlewares/fileUploadMiddleware');

const { list, remove, upload } = require('../controllers/slideController');

// get courselist
router.get('/', validation, list);

// add new slide
router.post('/', validation, docsUploader, upload);

// remove slide
router.post('/remove', validation, remove);

module.exports = router;
