'use strict';

const sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let Sequelize;

if (config.use_env_variable) {
	Sequelize = new sequelize(process.env[config.use_env_variable], config);
} else {
	Sequelize = new sequelize(config.database, config.username, config.password, config);
}

module.exports = {
	Sequelize,
};
