// Stub file created by Worktree-5 to resolve type errors
// This module was referenced but missing from the codebase

export interface RedisClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
}

class RedisClientStub implements RedisClient {
  async get(key: string): Promise<string | null> {
    return null;
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    return;
  }

  async del(key: string): Promise<void> {
    return;
  }

  async exists(key: string): Promise<boolean> {
    return false;
  }
}

export const redis = new RedisClientStub();
export default redis;
