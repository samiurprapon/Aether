'use strict';

const { v4: uuidv4 } = require('uuid');
const sequelize = require('sequelize');

const { Sequelize } = require('./index');
const User = require('./users');

const Role = Sequelize.define('roles', {
	id: {
		type: sequelize.UUID,
		defaultValue: () => uuidv4(),
		primaryKey: true,
		allowNull: false,
	},
	type: {
		type: sequelize.ENUM('student', 'teacher', 'admin', 'authority'),
		allowNull: false,
		defaultValue: 'student',
	},
});

Role.belongsTo(User, {
	foreignKey: 'uid',
	allowNull: false,
	as: 'userrole',

	onUpdate: 'CASCADE',
	onDelete: 'CASCADE',
});

module.exports = Role;
