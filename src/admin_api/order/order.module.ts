import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DispatcherResolver } from './dispatcher.resolver';
import { OrderMessageDTO } from './dto/order-message.dto';
import { OrderDTO } from './dto/order.dto';
import { OrderSubscriptionService } from './order-subscription.service';
import { OrderService } from './order.service';
import { RequestActivityEntity } from 'src/entities/request-activity.entity';
import { RequestEntity } from 'src/entities/request.entity';
import { OrderMessageEntity } from 'src/entities/request-message.entity';
import { SharedOrderModule } from 'src/order/shared-order.module';
import { RedisHelpersModule } from 'src/redis/redis-helper.module';
import { RedisPubSubProvider } from 'src/redis/redis-pubsub.provider';

@Module({
  imports: [
    SharedOrderModule,
    RedisHelpersModule,
    TypeOrmModule.forFeature([RequestActivityEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          RequestEntity,
          OrderMessageEntity
        ]),
      ],
      pubSub: RedisPubSubProvider.provider(),
      resolvers: [
        {
          EntityClass: RequestEntity,
          DTOClass: OrderDTO,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          guards: [JwtAuthGuard],
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
        },
        {
          EntityClass: OrderMessageEntity,
          DTOClass: OrderMessageDTO,
          pagingStrategy: PagingStrategies.OFFSET,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
      ],
    }),
  ],
  providers: [
    DispatcherResolver,
    OrderSubscriptionService,
    OrderService,
    RedisPubSubProvider.provider(),
  ],
})
export class OrderModule {}
