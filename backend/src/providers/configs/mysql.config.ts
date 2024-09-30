import 'reflect-metadata';
// import fs from 'fs';
import { DataSourceOptions } from 'typeorm';

import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USER } from '@/providers/configs/redis.config';

// entities
import { ServerLog } from '@/providers/mysql/entities/serverLog.entity';

// migrations
import { CreateServerLog1717194809707 } from '@/providers/mysql/migrations/1717194809707-CreateServerLog';

const dataSourceConfig: DataSourceOptions = {
	type: 'mysql',
	connectorPackage: 'mysql2',
	host: process.env.MYSQL_HOST,
	port: parseInt(process.env.MYSQL_PORT || '3306', 10),
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DB,
	migrationsRun: false,
	ssl: false,

	cache: {
		type: 'ioredis',
		options: {
			host: REDIS_HOST,
			port: REDIS_PORT,
			username: REDIS_USER,
			password: REDIS_PASSWORD,
			maxRetriesPerRequest: 3,
			tls: {
				rejectUnauthorized: process.env.NODE_ENV === 'production',
			},
		},
	},
	synchronize: false,
	logging: ['error', 'warn'],
	entities: [ServerLog],
	migrations: [CreateServerLog1717194809707],
};

export default dataSourceConfig;
