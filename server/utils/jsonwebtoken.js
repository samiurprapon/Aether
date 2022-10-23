const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config/secrets');

function generateTokens(user, role, userDetails) {
	let token = {};

	let refreshToken = jwt.sign({ user, role, userDetails }, process.env.REFRESH_TOKEN_SECRET || REFRESH_TOKEN_SECRET, {
		expiresIn: '30d',
	});

	let accessToken = jwt.sign({ user, role, userDetails }, process.env.ACCESS_TOKEN_SECRET || ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
	});

	token.accessToken = 'Bearer ' + accessToken;
	token.refreshToken = 'Bearer ' + refreshToken;

	return token;
}

function generateAccessTokens(user) {
	// console.log("generateAccessTokens: ", user);

	if (user) {
		delete user['iat'];
		delete user['exp'];
	}
	// console.log("Generate Access Token: starts");

	let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || config.ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
	});

	let token = 'Bearer ' + accessToken;

	// console.log("Generate Access Token: ", token);

	return token;
}

function decodeToken(token, isRefreshToken) {
	let tokenData = token.split(' ')[1];

	if (isRefreshToken) {
		return jwt.verify(tokenData, process.env.REFRESH_TOKEN_SECRET || config.REFRESH_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				return null;
			}

			return decoded;
		});
	} else {
		return jwt.verify(tokenData, process.env.ACCESS_TOKEN_SECRET || config.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				return null;
			}

			return decoded;
		});
	}
}

module.exports = {
	generateTokens,
	generateAccessTokens,
	decodeToken,
};
