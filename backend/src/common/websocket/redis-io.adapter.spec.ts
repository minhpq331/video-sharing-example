import { RedisIoAdapter } from './redis-io.adapter';
import { Redis } from 'ioredis';
import * as redisAdapter from '@socket.io/redis-adapter';

jest.mock('@socket.io/redis-adapter');

describe('RedisIoAdapter', () => {
  let redisIoAdapter: RedisIoAdapter;

  beforeEach(() => {
    redisIoAdapter = new RedisIoAdapter();
  });

  it('should connect to redis', async () => {
    const redisUri = 'redis://localhost:6379';
    jest.spyOn(Redis.prototype, 'connect').mockResolvedValue();
    jest.spyOn(redisIoAdapter, 'connectToRedis');

    await redisIoAdapter.connectToRedis(redisUri);

    expect(redisIoAdapter.connectToRedis).toHaveBeenCalledWith(redisUri);
  });

  it('should create io server with redis adapter', () => {
    const createSpy = jest.spyOn(redisIoAdapter, 'createIOServer');
    createSpy.mockImplementation(() => ({
      adapter: jest.fn(),
    }));
    const adapterSpy = jest.spyOn(redisAdapter, 'createAdapter');

    redisIoAdapter.createIOServer(3000);

    expect(createSpy).toHaveBeenCalled();
    expect(adapterSpy).toHaveBeenCalled();
  });
});
