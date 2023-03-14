const Role = require('../../models/roles');

const create = async (userId, type) => {
	return await Role.create(
		{
			uid: userId,
			type: type
		},
		{
			logging: false,
		}
	)
		.then((result) => {
			return result ? result : null;
		})
		.catch((err) => {
			console.log('Create role error: ', err);
			return null;
		});
};

const getRole = async (userId) => {
	return await Role.findOne({
		where: {
			uid: userId,
		},
		attributes: {
			exclude: ['createdAt', 'updatedAt'],
		},
		raw: true,
		logging: false,
	})
		.then((role) => {
			return role ? role : null;
		})
		.catch((err) => {
			console.log('Get role error: ', err);
			return null;
		});
};

module.exports = {
	create,
	getRole,
};
