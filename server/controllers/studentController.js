const Student = require('../models/students');
const User = require('../models/users');

const upsert = (req, res) => {
	let user = res.locals.user;

	// console.log(user);

	Student.findOne({
		where: {
			uid: user.uid,
		},
	})
		.then((student) => {
			if (student !== null) {
				// console.log("student found");)
				student
					.update({
						studentID: req.body.studentID,
						name: req.body.name,
						sex: req.body.sex,
					})
					.then((updatedStudent) => {
						res.status(201);
						res.send({
							success: true,
							message: 'Student Profile updated!',
							student: updatedStudent,
						});
					})
					.catch((err) => {
						res.status(403);
						res.send({
							success: false,
							message: err.message,
						});
					});
			} else {
				Student.create({
					studentID: req.body.studentID,
					name: req.body.name,
					sex: req.body.sex,
					uid: user.uid,
				})
					.then((newStudent) => {
						res.status(201);
						res.send({
							success: true,
							message: 'Student account created successfully!',
							student: newStudent,
						});
					})
					.catch((err) => {
						res.status(400);
						res.send({
							success: false,
							message: err.message,
						});
					});
			}
		})
		.catch((err) => {
			res.status(403);
			res.send({
				success: false,
				message: err.message,
			});
		});

	// upsert causes error
	// Student.upsert(
	//   {
	//     studentID: req.body.studentID,
	//     name: req.body.name,
	//     sex: req.body.sex,
	//     uid: user.uid,
	//   },
	//   // {
	//   //   where: {
	//   //     uid: user.uid,
	//   //   },
	//   //   returning: true,
	//   // }
	// )
	//   .then((student) => {
	//     res.status(201);
	//     res.send({
	//       success: true,
	//       message: "Student Profile updated!",
	//       student: student,
	//     });
	//   })
	//   .catch((err) => {
	//     res.status(403);
	//     res.send({
	//       success: false,
	//       message: err.message,
	//     });
	//   });
};

const isCompleted = (req, res) => {
	let user = res.locals.user;

	Student.findOne({
		where: {
			uid: user.uid,
		},
	})
		.then((student) => {
			if (student !== null) {
				res.status(202);
				res.send({
					success: true,
					isCompleted: true,
					message: 'Profile verification is completed!',
				});
			} else {
				res.status(401);
				res.send({
					success: false,
					isCompleted: false,
					message: 'Profile verification is not completed!',
				});
			}
		})
		.catch((err) => {
			res.status(400);
			res.send({
				success: false,
				isCompleted: false,
				message: err.message,
			});
		});
};

const details = async (req, res) => {
	let user = res.locals.user;

	const details = await User.findOne({
		where: {
			uid: user.uid,
		},
		attributes: {
			exclude: ['createdAt', 'updatedAt'],
		},
		raw: true,
		logging: flase,
	})
		.then((user) => {
			return user ? user : null;
		})
		.catch((err) => {
			return null;
		});

	if (!details) {
		return res.status(404).json({
			success: false,
			message: 'User not found!',
		});
	}

	const student = await Student.findOne({
		where: {
			uid: user.uid,
		},
		attributes: {
			exclude: ['createdAt', 'updatedAt'],
		},
		raw: true,
		logging: false,
	})
		.then((student) => {
			return student ? student : null;
		})
		.catch((err) => {
			return null;
		});

	if (!student) {
		return res.status(400).json({
			success: false,
			message: 'Student profile is not completed!',
		});
	}

	return res.status(200).json({
		success: true,
		message: 'Student details fetched successfully!',
		data: {
			user: user,
			details: details,
		},
	});
};

module.exports = {
	upsert,
	isCompleted,
	details,
};
