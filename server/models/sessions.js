'use strict';

const { v4: uuidv4 } = require('uuid');

const Student = require('./students');
const Slide = require('./slides');

const { Sequelize } = require('./index');
const sequelize = require('sequelize');

const Session = Sequelize.define('sessions', {
	id: {
		type: sequelize.UUID,
		defaultValue: () => uuidv4(),
		primaryKey: true,
		allowNull: false,
	},
	slideId: {
		type: sequelize.UUID,
		allowNull: false,

		references: {
			model: Slide,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	},
	start: {
		type: sequelize.DATE,
		allowNull: false,
	},
	end: {
		type: sequelize.DATE,
		allowNull: false,
		defaultValue: Sequelize.NOW,
	},
	uid: {
		type: sequelize.UUID,
		allowNull: false,

		references: {
			model: Student,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	},
});

module.exports = Session;
