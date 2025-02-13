import { AppDataProvider as AppProvider } from '@/providers/postgres/Provider';
import { LogDataProvider as LogProvider } from '@/providers/mysql/Provider';
import { RedisClient as Redis } from '@/providers/redis/Redis';

const AppDataProvider = AppProvider.getInstance();
const LogDataProvider = LogProvider.getInstance();
const RedisClient = Redis.getInstance();

export { AppDataProvider, LogDataProvider, RedisClient };
