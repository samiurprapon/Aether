import { Cluster, Redis } from 'ioredis';

export default interface IRedis {
	duplicate(): Redis | Cluster;
	getCache<T>(key: string): Promise<T | undefined>;
	setCache<T>(key: string, value: T, duration: number): Promise<void>;
	delCache(key: string): Promise<void>;

	getListCache<T>(key: string): Promise<T[]>;
	addListCache<T>(key: string, value: T): Promise<void>;
	deleteListCache<T>(key: string, value: T): Promise<void>;

	// delListCache(key: string): Promise<void>;
	// setListCache(key: string, value: object[], duration: number): Promise<void>;

	flushdb(): Promise<void>;
	quit(): Promise<void>;
}
