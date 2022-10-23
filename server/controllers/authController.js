const bcrypt = require('bcrypt');

const Credential = require('../models/credentials');
const User = require('../models/users');
const Student = require('../models/students');
const Teacher = require('../models/teachers');

const { generateTokens } = require('../utils/jsonwebtoken');
const { create, getRole } = require('../controllers/support/roleController');

const register = async (req, res) => {
	var { email, password, type } = req.body;

	if (!email || !password || !type) {
		return res.status(400).json({
			isError: true,
			message: 'Missing required fields',
		});
	}

	// sanitize email
	email = email.toLowerCase();
	email = email.trim();

	// sanitize password
	password = password.trim();

	// check strength of password
	if (password.length < 8) {
		return res.status(400).json({
			isError: true,
			message: 'Password must be at least 8 characters',
		});
	}

	// check if user exists
	const isExist = await User.findOne({
		where: {
			email: email,
		},
		raw: true,
		logging: false,
	})
		.then((user) => {
			return user ? true : false;
		})
		.catch((err) => {
			console.log('Get user error: ', err);
			return false;
		});

	if (isExist) {
		return res.status(400).json({
			isError: true,
			message: 'User already exists',
		});
	}

	// create credential
	const credential = await Credential.create(
		{
			password: password,
		},
		{
			raw: true,
			logging: false,
		}
	)
		.then((credential) => {
			return credential ? credential : null;
		})
		.catch((err) => {
			console.log('Create credential error: ', err);
			return null;
		});

	if (!credential) {
		return res.status(500).json({
			isError: true,
			message: 'Server error',
		});
	}

	// create user
	const user = await User.create(
		{
			email: email,
			cid: credential.id,
		},
		{
			raw: true,
			logging: false,
		}
	)
		.then((user) => {
			return user ? user : null;
		})
		.catch((err) => {
			console.log('Create user error: ', err);
			return null;
		});

	if (!user) {
		return res.status(500).json({
			isError: true,
			message: 'Server error',
		});
	}

	// create role
	const role = await create(user.id);

	if (!role) {
		return res.status(500).json({
			isError: true,
			message: 'Server error',
		});
	}

	if (role.type === 'student') {
		// create student
		const student = await Student.create(
			{
				uid: user.id,
			},
			{
				raw: true,
				logging: false,
			}
		)
			.then((student) => {
				return student ? student : null;
			})
			.catch((err) => {
				console.log('Create student error: ', err);
				return null;
			});

		if (!student) {
			return res.status(500).json({
				isError: true,
				message: 'Server error',
			});
		}
	} else if (role.type === 'teacher') {
		// create teacher
		const teacher = await Teacher.create(
			{
				uid: user.id,
			},
			{
				raw: true,
				logging: false,
			}
		)
			.then((teacher) => {
				return teacher ? teacher : null;
			})
			.catch((err) => {
				console.log('Create teacher error: ', err);
				return null;
			});

		if (!teacher) {
			return res.status(500).json({
				isError: true,
				message: 'Server error',
			});
		}
	}

	// ToDo: Add admin and authority role

	return res.status(201).json({
		isError: false,
		message: 'Successfully registered!',
	});
};

const login = async (req, res) => {
	var { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			isError: true,
			message: 'Email and password are required!',
		});
	}

	// sanitize email
	email = email.toLowerCase();
	email = email.trim();

	// sanitize password
	password = password.trim();

	// check if user exists
	const user = await User.findOne({
		where: {
			email: email,
		},
		raw: true,
		logging: false,
	})
		.then((user) => {
			return user ? user : null;
		})
		.catch((err) => {
			console.log('Login error: ', err);
			return null;
		});

	if (!user) {
		return res.status(400).json({
			isError: true,
			message: 'Invalid email or password!',
		});
	}

	// check if password is correct
	const credential = await Credential.findOne({
		where: {
			id: user.cid,
		},
		raw: true,
		logging: false,
	})
		.then((credential) => {
			return credential ? credential : null;
		})
		.catch((err) => {
			console.log('Login error: ', err);
			return null;
		});

	if (!credential) {
		return res.status(400).json({
			isError: true,
			message: 'Invalid email or password!',
		});
	}

	const isPasswordCorrect = await bcrypt.compare(password, credential.password);

	if (!isPasswordCorrect) {
		console.log('isPasswordCorrect: Invalid password');
		return res.status(400).json({
			isError: true,
			message: 'Invalid email or password!',
		});
	}

	// user.credential
	const role = await getRole(user.id);

	if (!role) {
		return res.status(400).json({
			isError: true,
			message: 'Invalid email or password!',
		});
	}

	var details = {};

	if (role.type === 'student') {
		details = await Student.findOne({
			where: {
				uid: user.id,
			},
			raw: true,
			logging: false,
		})
			.then((details) => {
				console.log('details: ', details);
				return details ? details : null;
			})
			.catch((err) => {
				console.log('Login error: ', err);
				return null;
			});
		console.log('Student details: ', details);
	} else if (role.type === 'teacher') {
		details = await Teacher.findOne({
			where: {
				id: user.id,
			},
			raw: true,
			logging: false,
		})
			.then((details) => {
				return details ? details : null;
			})
			.catch((err) => {
				console.log('Login error: ', err);
				return null;
			});
	}
	// ToDo: add admin and authority access

	if (!details) {
		return res.status(400).json({
			isError: true,
			message: 'Invalid email or password!',
		});
	}

	console.log('details: ', details);

	// generate tokens
	const tokens = generateTokens(user, role.id, details);

	// update credential last login time
	await Credential.update(
		{
			lastSignIn: new Date(),
		},
		{
			where: {
				id: user.cid,
			},
		}
	)
		.then((result) => {
			console.log('Credential updated successfully!');
			return res.status(200).json({
				isError: false,
				message: 'Logged in successfully!',
				tokens: tokens,
			});
		})
		.catch((err) => {
			console.log('Credential update error: ', err);

			return res.status(500).json({
				isError: true,
				message: 'Server error',
			});
		});
};

const refresh = (req, res) => {
	let token = {};

	jwt.verify(res.locals.refreshToken, process.env.REFRESH_TOKEN_SECRET || config.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			console.log(err);
			return null;
		}

		delete user['password'];
		delete user['iat'];
		delete user['exp'];

		token.accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || config.ACCESS_TOKEN_SECRET, {
			expiresIn: '45m',
		});
	});

	if (token) {
		res.status(200);
		res.send({
			success: true,
			message: 'Token refreshed Successfully!',
			accessToken: 'Bearer ' + token.accessToken,
		});
	} else {
		res.status(403);
		res.send({
			success: false,
			message: 'Unauthorized access!',
		});
	}
};

const deAuth = (req, res) => {
	let user = res.locals.user;

	Credential.update(
		{
			token: null,
		},
		{
			where: {
				email: user.email,
			},
		}
	)
		.then((_result) => {
			res.status(200);
			res.send({
				success: true,
				message: 'Logout successfully!',
			});
		})
		.catch((err) => {
			res.status(403);
			res.send({
				success: false,
				message: 'Logout failed!',
			});
		});
};

module.exports = {
	register,
	login,
	refresh,
	deAuth,
};
