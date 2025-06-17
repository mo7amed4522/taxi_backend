import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DriverRedisService } from "./driver-redis.service";
import { OrderRedisService } from "./order-redis.service";
import { DriverEntity } from "src/entities/driver.entity";
import { DriverWalletEntity } from "src/entities/driver-wallet.entity";
import { DriverTransactionEntity } from "src/entities/driver-transaction.entity";
import { SharedDriverService } from "src/order/shared-driver.service";
import { RedisModule, RedisService } from '@liaoliaots/nestjs-redis';
import { RedisPubSubProvider } from "./redis-pubsub.provider";

// Provider for REDIS_CLIENT token
const RedisClientProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: (redisService: RedisService) => redisService.getOrThrow(),
  inject: [RedisService],
};

@Module({
    imports: [
        TypeOrmModule.forFeature([DriverEntity, DriverWalletEntity, DriverTransactionEntity]),
        RedisModule.forRoot({
            closeClient: true,
            commonOptions: { db: 2 },
            config: {
                host: process.env.REDIS_HOST ?? 'localhost',
            },
        }),
    ],
    providers: [DriverRedisService, OrderRedisService, SharedDriverService, RedisClientProvider, RedisPubSubProvider.provider()],
    exports: [DriverRedisService, OrderRedisService, RedisClientProvider, RedisPubSubProvider.provider()]
})
export class RedisHelpersModule {}