const Student = require('../models/students');
const Teacher = require('../models/teachers');

const isStudent = async (req, res, next) => {
	const data = res.locals.data;

	return await Student.findOne({
		where: { uid: data.user.id },
		attributes: {
			exclude: ['createdAt', 'updatedAt', 'uid'],
		},
		logging: false,
		raw: true,
	})
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
	const data = res.locals.data;

	return await Teacher.findOne({
		where: { uid: data.user.id },
		attributes: {
			exclude: ['createdAt', 'updatedAt', 'uid'],
		},
		logging: false,
		raw: true,
	})
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
