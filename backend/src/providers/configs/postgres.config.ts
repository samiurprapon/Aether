import 'reflect-metadata';
import fs from 'fs';
import dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
dotenv.config();

import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USER } from '@/providers/configs/redis.config';

// entities
import { Credential } from '@/providers/postgres/entities/credential.entity';

// migrations
import { CreateCredentials1717188639010 } from '@/providers/postgres/migrations/1717188639010-CreateCredentials';

const dataSourceConfig: DataSourceOptions = {
	type: 'postgres',
	host: process.env.POSTGRES_HOST || 'localhost',
	port: parseInt(process.env.POSTGRES_PORT || '5432'),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	ssl: {
		rejectUnauthorized: process.env.NODE_ENV === 'production',
		ca: process.env.NODE_ENV === 'production' ? fs.readFileSync('./src/providers/configs/certs/postgres.pem') : '',
	},
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

	// },
	synchronize: false,
	logging: ['error', 'warn'],
	entities: [Credential],
	migrations: [CreateCredentials1717188639010],
};

export default dataSourceConfig;