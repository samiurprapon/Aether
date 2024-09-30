import { Cluster, Redis } from 'ioredis';

import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USER } from '@/providers/configs/redis.config';
import IRedis from './interface/redis.interface';

export class RedisClient<T extends Redis> implements IRedis {
	private static instance: RedisClient<Redis>;
	private redisInstance: T;

	private constructor(redisInstance: T) {
		this.redisInstance = redisInstance;
	}

	public static getInstance(): RedisClient<Redis> {
		if (!this.instance) {
			this.instance = new RedisClient<Redis>(
				new Redis({
					host: REDIS_HOST,
					port: REDIS_PORT,
					username: REDIS_USER,
					password: REDIS_PASSWORD,
					maxRetriesPerRequest: 3,
					tls: {
						rejectUnauthorized: process.env.NODE_ENV === 'production',
					},
				}),
			);
		}

		return this.instance;
	}

	async setCache<T>(key: string, value: T, duration: number): Promise<void> {
		await this.redisInstance.set(key, JSON.stringify(value as T), 'EX', duration).catch(err => {
			throw err;
		});
	}

	async getCache<T>(key: string): Promise<T | undefined> {
		return await this.redisInstance
			.get(key)
			.then(data => {
				if (!data) {
					return undefined;
				}

				return JSON.parse(data || '') as T;
			})
			.catch(err => {
				console.log('GetCache: ', err);

				throw err;
			});
	}

	async delCache(key: string): Promise<void> {
		await this.redisInstance.del(key).catch(err => {
			throw err;
		});
	}

	async getListCache<T>(key: string): Promise<T[]> {
		if (!key) {
			throw new Error('Not a valid key!');
		}

		const result: string[] = await this.redisInstance.smembers(key);

		return result.map((item: string) => {
			return JSON.parse(item) as T;
		});
	}

	async addListCache<T>(key: string, value: T): Promise<void> {
		if (!key) {
			throw new Error('Key is not valid');
		}

		const list: T[] = await this.getListCache<T>(key);

		list.forEach(async item => {
			if (item) {
				await this.redisInstance.srem(key, JSON.stringify(item));
			}
		});

		await this.redisInstance.sadd(key, JSON.stringify(value));
		await this.redisInstance.expire(key, 60 * 60 * 24);
	}

	async deleteListCache<T>(key: string, value: T): Promise<void> {
		if (!key) {
			throw new Error('Key is not valid');
		}

		if (await this.redisInstance.sismember(key, JSON.stringify(value as T))) {
			await this.redisInstance.srem(key, JSON.stringify(value as T));
		}
	}

	// Inherited Methods from ioRedis directly
	async flushdb(): Promise<void> {
		await this.redisInstance.flushdb();
	}

	async quit(): Promise<void> {
		await this.redisInstance.quit();
	}

	duplicate(): Redis | Cluster {
		return this.redisInstance.duplicate();
	}
}
