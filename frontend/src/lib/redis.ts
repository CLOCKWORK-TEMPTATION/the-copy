/**
 * Redis client configuration and utilities
 */

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
  keyPrefix?: string;
  maxRetriesPerRequest?: number;
  enableReadyCheck?: boolean;
  maxmemoryPolicy?: string;
}

export interface RedisClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
  keys(pattern: string): Promise<string[]>;
  flushdb(): Promise<void>;
  ping(): Promise<string>;
  disconnect(): Promise<void>;
}

export class RedisService implements RedisClient {
  private config: RedisConfig;
  private connected: boolean = false;

  constructor(config: RedisConfig) {
    this.config = {
      db: 0,
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      host: 'localhost',
      port: 6379,
      ...config,
    };
  }

  async connect(): Promise<void> {
    // Stub implementation - would connect to actual Redis
    this.connected = true;
    console.log('Redis connected');
  }

  async get(key: string): Promise<string | null> {
    if (!this.connected) await this.connect();
    // Stub implementation
    return null;
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (!this.connected) await this.connect();
    // Stub implementation
    console.log(`Redis set: ${key} = ${value}`);
  }

  async del(key: string): Promise<void> {
    if (!this.connected) await this.connect();
    // Stub implementation
    console.log(`Redis del: ${key}`);
  }

  async exists(key: string): Promise<boolean> {
    if (!this.connected) await this.connect();
    // Stub implementation
    return false;
  }

  async keys(pattern: string): Promise<string[]> {
    if (!this.connected) await this.connect();
    // Stub implementation
    return [];
  }

  async flushdb(): Promise<void> {
    if (!this.connected) await this.connect();
    // Stub implementation
    console.log('Redis flushdb');
  }

  async ping(): Promise<string> {
    if (!this.connected) await this.connect();
    // Stub implementation
    return 'PONG';
  }

  async disconnect(): Promise<void> {
    this.connected = false;
    console.log('Redis disconnected');
  }
}

// Create a singleton instance
let redisInstance: RedisService | null = null;

export function createRedisClient(config: RedisConfig): RedisService {
  if (!redisInstance) {
    redisInstance = new RedisService(config);
  }
  return redisInstance;
}

export function getRedisClient(): RedisService | null {
  return redisInstance;
}

// Default configuration
export const defaultRedisConfig: RedisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || '0'),
  keyPrefix: process.env.REDIS_KEY_PREFIX || 'app:',
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
};

// Export types
export type { RedisConfig as Config };
export type { RedisClient as Client };
export type { RedisService as Service };

/**
 * Get a cached value by key, with optional factory function
 * @param key - Cache key
 * @param factory - Optional factory function to generate value if cache miss
 * @param ttl - Time to live in seconds (optional, used with factory)
 * @returns The cached value or factory result
 */
export async function getCached<T>(
  key: string,
  factory?: () => Promise<T>,
  ttl?: number
): Promise<T | null> {
  const client = getRedisClient();

  // Try to get from cache first
  if (client) {
    const value = await client.get(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch {
        // Fall through to factory if parse fails
      }
    }
  }

  // If no factory provided, return null
  if (!factory) return null;

  // Call factory to generate value
  const result = await factory();

  // Cache the result if client available
  if (client && result !== null && result !== undefined) {
    await client.set(key, JSON.stringify(result), ttl);
  }

  return result;
}

/**
 * Set a cached value
 * @param key - Cache key
 * @param value - Value to cache
 * @param ttl - Time to live in seconds (optional)
 */
export async function setCached<T>(
  key: string,
  value: T,
  ttl?: number
): Promise<void> {
  const client = getRedisClient();
  if (!client) return;

  await client.set(key, JSON.stringify(value), ttl);
}

/**
 * Invalidate (delete) a cached value
 * @param key - Cache key or pattern to invalidate
 */
export async function invalidateCache(key: string): Promise<void> {
  const client = getRedisClient();
  if (!client) return;

  // If key contains wildcards, delete all matching keys
  if (key.includes('*')) {
    const keys = await client.keys(key);
    await Promise.all(keys.map((k) => client.del(k)));
  } else {
    await client.del(key);
  }
}

// Default export
export default {
  RedisService,
  createRedisClient,
  getRedisClient,
  defaultRedisConfig,
  getCached,
  setCached,
  invalidateCache,
};
