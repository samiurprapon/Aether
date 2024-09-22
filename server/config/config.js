module.exports = {
	development: {
		username: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASS || 'postgres',
		database: process.env.DB_NAME || 'aether_development',
		host: process.env.DB_HOST || '127.0.0.1',
		dialect: 'postgres',
		pool: {
			max: 10,
			min: 1,
			idle: 30000, // The maximum time, in milliseconds, that a connection can be idle before being released.
			acquire: 90000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
		},
		dialectOptions: {
			useUTC: false, // for reading from database
		},
		timezone: '+06:00', // for writing to database
	},
	test: {
		username: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASS || 'postgres',
		database: process.env.DB_NAME || 'aether_development',
		host: process.env.DB_HOST || '127.0.0.1',
		dialect: 'postgres',
		pool: {
			max: 20,
			min: 1,
			idle: 30000, // The maximum time, in milliseconds, that a connection can be idle before being released.
			acquire: 90000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
		},
		dialectOptions: {
			useUTC: false, // for reading from database
		},
		timezone: '+06:00', // for writing to database
	},
	production: {
		username: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASS || 'postgres',
		database: process.env.DB_NAME || 'aether_development',
		host: process.env.DB_HOST || '127.0.0.1',
		dialect: 'postgres',
		pool: {
			max: 20,
			min: 1,
			idle: 30000, // The maximum time, in milliseconds, that a connection can be idle before being released.
			acquire: 90000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
		},
		dialectOptions: {
			useUTC: false, // for reading from database
		},
		timezone: '+06:00', // for writing to database
	},
};
