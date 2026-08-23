import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { OrderMessageEntity } from 'src/entities/request-message.entity';
import { RequestEntity } from 'src/entities/request.entity';
import { ChatService } from './chat.service';
import { OrderMessageDTO } from './dto/order-message.dto';
import { OrderMessageInput } from './dto/order-message.input';
import { FirebaseNotificationModule } from 'src/order/firebase-notification-service/firebase-notification-service.module';
import { RedisPubSubProvider } from 'src/redis/redis-pubsub.provider';
import { RiderNotificationService } from 'src/order/firebase-notification-service/rider-notification.service';
import { RedisHelpersModule } from 'src/redis/redis-helper.module';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import * as admin from 'firebase-admin';
import { existsSync, promises as fs } from 'fs';
import { Logger } from '@nestjs/common';
import { RedisModule, RedisService } from '@liaoliaots/nestjs-redis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

async function getFirebaseConfig() {
  const configAddress = `${process.cwd()}/config/config.${process.env.NODE_ENV}.json`;
  if (existsSync(configAddress)) {
    const file = await fs.readFile(configAddress, { encoding: 'utf-8' });
    const config = JSON.parse(file);
    const firebaseKeyFileAddress = `${process.cwd()}/config/${config.firebaseProjectPrivateKey}`;
    if (
      config.firebaseProjectPrivateKey != null &&
      existsSync(firebaseKeyFileAddress)
    ) {
      return {
        credential: admin.credential.cert(firebaseKeyFileAddress),
      };
    }
  }
  return null;
}

// Custom provider for pub_sub that uses Redis client
const PubSubProvider = {
  provide: 'pub_sub',
  useFactory: (redisService: RedisService) => {
    const redisClient = redisService.getOrThrow();
    return new RedisPubSub({
      publisher: redisClient,
      subscriber: redisClient,
    });
  },
  inject: [RedisService],
};

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEntity]),
    FirebaseAdminModule.forRootAsync({
      useFactory: async () => {
        const config = await getFirebaseConfig();
        if (!config) {
          Logger.warn(
            'Firebase configuration not found, notifications will be disabled',
          );
          return {
            credential: admin.credential.applicationDefault(),
          };
        }
        return config;
      },
    }),
    RedisHelpersModule,
    RedisModule.forRoot({
      closeClient: true,
      commonOptions: { db: 2 },
      config: {
        host: process.env.REDIS_HOST ?? 'localhost',
      },
    }),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          OrderMessageEntity,
          RequestEntity,
        ]),
        RedisHelpersModule,
        RedisModule.forRoot({
          closeClient: true,
          commonOptions: { db: 2 },
          config: {
            host: process.env.REDIS_HOST ?? 'localhost',
          },
        }),
      ],
      services: [ChatService, RiderNotificationService],
      resolvers: [
        {
          EntityClass: OrderMessageEntity,
          DTOClass: OrderMessageDTO,
          CreateDTOClass: OrderMessageInput,
          UpdateDTOClass: OrderMessageInput,
          enableTotalCount: true,
          enableAggregate: true,
        },
      ],
      pubSub: PubSubProvider,
    }),
  ],
  providers: [ChatService, RiderNotificationService, PubSubProvider],
})
export class ChatModule {}
