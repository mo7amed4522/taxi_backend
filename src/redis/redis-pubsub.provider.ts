import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Redis } from 'ioredis';

export class RedisPubSubProvider {
    static provider() {
        return {
            provide: 'PUB_SUB',
            useFactory: (redis: Redis) => {
                return new RedisPubSub({
                    publisher: redis,
                    subscriber: redis
                });
            },
            inject: ['REDIS_CLIENT']
        };
    }
} 