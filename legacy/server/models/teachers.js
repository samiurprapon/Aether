'use strict';

const { v4: uuidv4 } = require('uuid');

const User = require('./users');
const Course = require('./courses');

const { Sequelize } = require('./index');
const sequelize = require('sequelize');

const Teacher = Sequelize.define('teachers', {
	id: {
		type: sequelize.UUID,
		defaultValue: () => uuidv4(),
		primaryKey: true,
		allowNull: false,
	},
	initial: {
		type: sequelize.STRING,
		allowNull: true,
		unique: true,
	},
});

Teacher.belongsTo(User, {
	foreignKey: 'uid',
	allowNull: false,
	as: 'teacher',

	onUpdate: 'CASCADE',
	onDelete: 'CASCADE',
});

Teacher.hasMany(Course, {
	foreignKey: 'tid',
	targetKey: 'id',
});

module.exports = Teacher;
