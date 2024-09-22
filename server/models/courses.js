'use strict';

const { v4: uuidv4 } = require('uuid');
const { nanoid } = require('nanoid');

const Student = require('./students');

const Sequelize = require('./index').Sequelize;
const sequelize = require('sequelize');

const Course = Sequelize.define('courses', {
	id: {
		type: sequelize.UUID,
		defaultValue: () => uuidv4(),
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: sequelize.STRING,
		allowNull: true,
	},
	code: {
		type: sequelize.STRING,
		unique: false,
		allowNull: false,
	},
	section: {
		type: sequelize.STRING,
		allowNull: false,
	},
	enroll: {
		type: sequelize.STRING,
		allowNull: false,
		defaultValue: () => nanoid(6),
		unique: true,
	},
	semester: {
		type: sequelize.STRING,
		allowNull: true,
	},
	year: {
		type: sequelize.STRING,
		allowNull: false,
		defaultValue: () => new Date().getFullYear(),
	},
	isArchived: {
		type: sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

Course.belongsToMany(Student, { through: 'studentCourses' });
Student.belongsToMany(Course, { through: 'studentCourses' });

module.exports = Course;
