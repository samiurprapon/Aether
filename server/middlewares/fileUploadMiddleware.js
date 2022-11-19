const multer = require('multer');

const fileCheck = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
	fileFilter: function (req, file, cb) {
		// Allowed document types
		const documentTypes =
			/pdf|doc|docx|txt|rtf|odt|ods|odp|odg|odf|odb|odc|odf|odi|odm|ott|ots|otp|otg|otf|otb|otc|otf|oti|otm/;

		// Check ext
		const extname = documentTypes.test(path.extname(file.originalname).toLowerCase());
		// Check mime
		const mimetype = filetypes.test(file.mimetype);

		if (mimetype && extname) {
			return cb(null, true);
		} else {
			cb(null, false);
		}
	},
});

const docsUploader = () => {
	multer({
		storage: fileCheck,
		limits: {
			fileSize: 1024 * 1024 * 2,
		},
	}).single('docs');
};

const imageUploader = () => {
	multer({
		storage: fileCheck,
		limits: {
			fileSize: 1024 * 1024 * 2,
		},
	}).single('image');
};

module.exports = {
	docsUploader,
	imageUploader,
};
