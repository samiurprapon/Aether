const Role = require('../../models/roles');

const create = async (userId) => {
	return await Role.create(
		{
			uid: userId,
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
