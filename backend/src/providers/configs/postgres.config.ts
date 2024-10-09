import 'reflect-metadata';
// import fs from 'fs';
import { DataSourceOptions } from 'typeorm';

import { config } from '@/configs';

const dataSourceConfig: DataSourceOptions = {
	type: 'postgres',
	host: config.DB_HOST,
	port: config.DB_PORT,
	username: config.DB_USER,
	password: config.DB_PASSWORD,
	database: config.DB_NAME,
	ssl: false,
	schema: 'public',
	migrationsRun: false,
	connectTimeoutMS: 30 * 1000,
	maxQueryExecutionTime: 20 * 1000,
	extra: {
		max: 20,
		poolSize: 20,
		idleTimeoutMillis: 30 * 1000,
		connectionTimeoutMillis: 10 * 1000,
	},
	poolErrorHandler: err => {
		// reconnect here
		console.error('Postgres Pool error: ', (err as Error).message);
	},

	cache: {
		type: 'ioredis',
		options: {
			host: config.REDIS_HOST,
			port: config.REDIS_PORT,
			username: config.REDIS_USER,
			password: config.REDIS_PASSWORD,

			redisOptions: {
				maxRetriesPerRequest: 1,
			},
		},
	},

	// },
	synchronize: false,
	logging: ['error', 'warn'],
	entities: ['./src/providers/postgres/entities/*.entity.{ts,js}'],
	migrations: ['./src/providers/postgres/migrations/*.{ts,js}'],
};

export default dataSourceConfig;
