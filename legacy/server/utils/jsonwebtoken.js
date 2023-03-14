const jwt = require('jsonwebtoken');

const generateTokens = (user, details, permissions) => {
	let token = {};

	delete details['uid'];
	delete permissions['uid'];

	let refreshToken = jwt.sign(
		{ user, details, permissions },
		process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET',
		{
			expiresIn: '30d',
		}
	);

	let accessToken = jwt.sign({ user, details, permissions }, process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET', {
		expiresIn: '15m',
	});

	token.accessToken = 'Bearer ' + accessToken;
	token.refreshToken = 'Bearer ' + refreshToken;

	return token;
};

const generateAccessToken = async (data) => {
	// console.log("generateAccessTokens: ", user);

	if (data) {
		delete data['iat'];
		delete data['exp'];
	}
	// console.log("Generate Access Token: starts");

	let accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET', {
		expiresIn: '15m',
	});

	let token = 'Bearer ' + accessToken;

	// console.log("Generate Access Token: ", token);

	return token;
};

const decodeToken = async (token, isRefreshToken) => {
	let tokenData = token.split(' ')[1];

	console.log('tokenData: ', process.env.REFRESH_TOKEN_SECRET);

	if (isRefreshToken) {
		return jwt.verify(tokenData, process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET', (err, decoded) => {
			if (err) {
				return null;
			}

			return decoded;
		});
	} else {
		return jwt.verify(tokenData, process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET', (err, decoded) => {
			if (err) {
				return null;
			}

			return decoded;
		});
	}
};

module.exports = {
	generateTokens,
	generateAccessToken,
	decodeToken,
};
