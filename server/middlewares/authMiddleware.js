const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config/secrets');

// check access token is valid or not
const authentication = (req, res, next) => {
	if (!req.headers['authorization']) {
		return res.status(401).json({
			isError: true,
			message: 'Login first!',
		});
	}

	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({
			isError: true,
			message: 'jwt malformed!',
		});
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || ACCESS_TOKEN_SECRET, (err, data) => {
		if (err) {
			// console.log(err);
			return res.status(403).json({
				isError: true,
				message: err.message,
			});
		}

		res.locals.data = data;

		next();
	});
};

// check refresh token is valid or not
const validation = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).send({
			isError: true,
			message: 'Unauthorized access!',
		});
	}

	return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || REFRESH_TOKEN_SECRET, (err, details) => {
		if (err) {
			return res.status(403).send({
				isError: true,
				message: err.message,
			});
		}

		res.locals.data = details;

		next();
	});
};

module.exports = {
	authentication,
	validation,
};
