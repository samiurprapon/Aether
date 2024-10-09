import 'reflect-metadata';
// import fs from 'fs';
import { DataSourceOptions } from 'typeorm';
import { config } from '@/configs';

// entities
import { ServerLog } from '@/providers/mysql/entities/serverLog.entity';

// migrations
import { CreateServerLog1717194809707 } from '@/providers/mysql/migrations/1717194809707-CreateServerLog';

const dataSourceConfig: DataSourceOptions = {
	type: 'mysql',
	connectorPackage: 'mysql2',
	host: config.LOGS_DB_HOST,
	port: config.LOGS_DB_PORT,
	username: config.LOGS_DB_USER,
	password: config.LOGS_DB_PASSWORD,
	database: config.LOGS_DB_NAME,
	migrationsRun: false,
	ssl: false,

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
	synchronize: false,
	logging: ['error', 'warn'],
	entities: [ServerLog],
	migrations: [CreateServerLog1717194809707],
};

export default dataSourceConfig;
