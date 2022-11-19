'use strict';

const { v4: uuidv4 } = require('uuid');

const User = require('./users');

const sequelize = require('sequelize');
const { Sequelize } = require('./index');

const Student = Sequelize.define('students', {
	id: {
		type: sequelize.UUID,
		defaultValue: () => uuidv4(),
		primaryKey: true,
		allowNull: false,
	},
	studentID: {
		type: sequelize.INTEGER,
		allowNull: true,
		unique: true,
	},
	school: {
		type: sequelize.STRING,
		allowNull: true,
	},
});

Student.belongsTo(User, {
	foreignKey: 'uid',
	allowNull: false,
	as: 'student',

	onUpdate: 'CASCADE',
	onDelete: 'CASCADE',
});

module.exports = Student;
