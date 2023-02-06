const Student = require('../models/students');
const Teacher = require('../models/teachers');

const isStudent = async (req, res, next) => {
	const user = res.locals.user;

	return await Student.findOne({ uid: user.id })
		.then((student) => {
			if (student) {
				res.locals.student = student;
				return next();
			} else {
				return res.status(401).json({
					isError: true,
					message: 'Unauthorized',
				});
			}
		})
		.catch((err) => {
			console.log('Student validation error: ', err);

			return res.status(500).json({
				isError: true,
				message: 'Server error',
			});
		});
};

const isTeacher = async (req, res, next) => {
	const user = res.locals.user;

	return await Teacher.findOne({ user: user.id })
		.then((teacher) => {
			if (teacher) {
				res.locals.teacher = teacher;
				return next();
			} else {
				return res.status(401).json({
					isError: true,
					message: 'Unauthorized',
				});
			}
		})
		.catch((err) => {
			console.log('Teacher validation error: ', err);

			return res.status(500).json({
				isError: true,
				message: 'Server error',
			});
		});
};

module.exports = {
	isStudent,
	isTeacher,
};
