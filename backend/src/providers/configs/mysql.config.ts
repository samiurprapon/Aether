import 'reflect-metadata';
import { DataSourceOptions } from 'typeorm';

import { REDIS_HOST, REDIS_PORT } from '@/providers/configs/redis.config';

const dataSourceConfig: DataSourceOptions = {
	type: 'mysql',
	connectorPackage: 'mysql2',
	host: process.env.LOGS_DB_HOST,
	port: parseInt(process.env.LOGS_DB_PORT || '3306', 10),
	username: process.env.LOGS_DB_USER,
	password: process.env.LOGS_DB_PASSWORD,
	database: process.env.LOGS_DB_NAME,
	migrationsRun: true,
	cache: {
		type: 'ioredis',
		options: {
			host: REDIS_HOST,
			port: REDIS_PORT,
		},
	},
	synchronize: false,
	logging: ['error', 'warn'],
	entities: ['src/providers/logs/entities/*.entity.ts'],
	migrations: ['src/providers/logs/migrations/*.ts'],
};

export default dataSourceConfig;
