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
      host: 'localhost',
      port: 6379,
      db: 0,
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
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
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
  keyPrefix: process.env.REDIS_KEY_PREFIX || 'app:',
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
};

// Export types
export type { RedisConfig as Config };
export type { RedisClient as Client };
export type { RedisService as Service };

// Default export
export default {
  RedisService,
  createRedisClient,
  getRedisClient,
  defaultRedisConfig,
};
