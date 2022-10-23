'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const { Sequelize } = require('./index');
const sequelize = require('sequelize');

const Credential = Sequelize.define(
	'credentials',
	{
		id: {
			type: sequelize.UUID,
			defaultValue: () => uuidv4(),
			primaryKey: true,
			allowNull: false,
		},
		password: {
			type: sequelize.STRING,
			allowNull: false,
		},
		lastSignIn: {
			type: sequelize.DATE,
			allowNull: true,
		},
	},
	{
		hooks: {
			beforeCreate: (credential) => {
				credential.password = bcrypt.hashSync(credential.password, 10);
			},
		},
	}
);

// instance methods
Credential.prototype.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = Credential;
