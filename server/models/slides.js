'use strict';

const { v4: uuidv4 } = require('uuid');

const { Sequelize } = require('./index');
const sequelize = require('sequelize');

const Course = require('./courses');

const Slide = Sequelize.define('slides', {
	id: {
		type: sequelize.UUID,
		defaultValue: () => uuidv4(),
		primaryKey: true,
		allowNull: false,
	},
	title: {
		type: sequelize.STRING,
		unique: false,
		allowNull: false,
	},
	url: {
		type: sequelize.STRING,
		unique: false,
		allowNull: false,
	},
	cid: {
		type: sequelize.UUID,
		allowNull: false,

		references: {
			model: Course,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	},
});

module.exports = Slide;
