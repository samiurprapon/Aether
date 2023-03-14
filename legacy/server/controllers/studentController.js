const { Sequelize } = require('../models');

const Student = require('../models/students');
const User = require('../models/users');

const upsert = async (req, res) => {
	let data = res.locals.data;

	var { studentID, school, name, sex } = req.body;

	// validate studentID, school, name and sex
	studentID = studentID.trim();
	school = school.trim();
	name = name.trim();
	sex = sex.trim();

	const t = await Sequelize.transaction();

	try {
		await User.update(
			{
				name: name,
				sex: sex,
			},
			{
				where: {
					id: data.user.id,
				},

				transacting: t,
			}
		);

		await Student.update(
			{
				studentID: studentID,
				school: school,
			},
			{
				where: {
					uid: data.user.id,
				},
				transacting: t,
			}
		);

		await t.commit();

		return res.status(201).json({
			success: true,
			message: 'Student details updated successfully!',
		});
	} catch (error) {
		console.log(error);

		await t.rollback();

		return res.status(500).json({
			success: false,
			message: 'Something went wrong!',
		});
	}
};

const isCompleted = async (req, res) => {
	let data = res.locals.data;
	let details = res.locals.student;

	const user = await User.findOne({
		where: {
			id: data.user.id,
		},
		attributes: {
			exclude: ['createdAt', 'updatedAt', 'uid'],
		},
		raw: true,
		logging: false,
	});

	if (!user.name || !details.studentID || !details.school) {
		return res.status(400).json({
			success: false,
			isCompleted: false,
			message: 'Profile verification is not completed!',
		});
	}

	return res.status(202).json({
		success: true,
		isCompleted: true,
		message: 'Profile verification is completed!',
	});
};

const details = async (req, res) => {
	let data = res.locals.data;
	let student = res.locals.student;

	const user = await User.findOne({
		where: {
			id: data.user.id,
		},
		attributes: {
			exclude: ['createdAt', 'updatedAt', 'uid'],
		},
		raw: true,
		logging: false,
	});

	return res.status(200).json({
		success: true,
		message: 'Student details fetched successfully!',
		data: {
			user: user,
			details: student,
		},
	});
};

module.exports = {
	upsert,
	isCompleted,
	details,
};
