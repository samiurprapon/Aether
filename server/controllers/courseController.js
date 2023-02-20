const Course = require('../models/courses');

const add = async (req, res) => {
	let teacher = res.locals.teacher;

	var { name, section, code, semester } = req.body;

	return await Course.create(
		{
			name: name,
			code: code,
			section: section,
			semester: semester,
			tid: teacher.id,
		},
		{
			logging: false,
		}
	)
		.then((course) => {
			return res.status(201).json({
				success: true,
				message: 'Course section created successfully!',
				course: course,
			});
		})
		.catch((err) => {
			return res.status(400).json({
				success: false,
				message: err.message,
			});
		});
};

const list = async (req, res) => {
	let teacher = res.locals.teacher;

	const { archived } = req.body;

	return await Course.findAll({
		where: {
			tid: teacher.id,
			archived: archived ? true : false,
		},
	})
		.then((courses) => {
			return res.status(200).json({
				success: true,
				courses: courses,
			});
		})
		.catch((err) => {
			return res.status(400).json({
				success: false,
				message: err.message,
			});
		});
};

const update = async (req, res) => {
	let teacher = res.locals.teacher;

	var { id, name, section, code, semester } = req.body;

	return await Course.update(
		{
			code: code,
			section: section,
			name: name,
			semester: semester,
		},
		{
			where: {
				id: id,
				tid: teacher.id,
			},
		}
	)
		.then((course) => {
			return res.status(200).json({
				success: true,
				message: 'Course section updated successfully!',
			});
		})
		.catch((err) => {
			return res.status(400).json({
				success: false,
				message: err.message,
			});
		});
};

const remove = async (req, res) => {
	let teacher = res.locals.teacher;

	return await Course.destroy({
		where: {
			id: req.body.id,

			tid: teacher.id,
		},
	})
		.then(() => {
			return res.status(200).json({
				success: true,
				message: 'Course section deleted successfully!',
			});
		})
		.catch((err) => {
			return res.status(400).json({
				success: false,
				message: err.message,
			});
		});
};

const archived = async (req, res) => {
	let teacher = res.locals.teacher;

	const { archived, id } = req.body;

	return await Course.update(
		{
			archived: archived ? true : false,
		},
		{
			where: {
				id: id,
				tid: teacher.id,
			},
		}
	)
		.then(() => {
			return res.status(200).json({
				success: true,
				message: 'Course section archived successfully!',
			});
		})
		.catch((err) => {
			return res.status(400).json({
				success: false,
				message: err.message,
			});
		});
};

module.exports = {
	add,
	list,
	update,
	remove,
	archived,
};
