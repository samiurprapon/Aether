'use strict';

const { v4: uuidv4 } = require('uuid');
const sequelize = require('sequelize');

const { Sequelize } = require('./index');
const Credential = require('./credentials');

const User = Sequelize.define('users', {
	id: {
		type: sequelize.UUID,
		defaultValue: () => uuidv4(),
		primaryKey: true,
		allowNull: false,
	},
	email: {
		type: sequelize.STRING,
		unique: true,
		validate: {
			isEmail: true,
		},
		allowNull: false,
	},
	name: {
		type: sequelize.STRING,
		allowNull: true,
	},
	sex: {
		type: sequelize.ENUM('male', 'female', 'other'),
		allowNull: false,
		defaultValue: 'male',
	},
	isBan: {
		type: sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

Credential.hasOne(User, {
	foreignKey: 'cid',
	as: 'credential',

	onUpdate: 'CASCADE',
	onDelete: 'CASCADE',
});

module.exports = User;
