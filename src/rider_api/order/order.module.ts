import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GqlAuthGuard } from '../auth/jwt-gql-auth.guard';
import { RiderModule } from '../rider/rider.module';
import { ServiceModule } from '../service/service.module';
import { CarColorDTO } from './dto/car-color.dto';
import { CarModelDTO } from './dto/car-model.dto';
import { DriverDTO } from './dto/driver.dto';
import { OrderDTO } from './dto/order.dto';
import { OrderResolver } from './order.resolver';
import { RiderOrderService } from './rider-order.service';
import { OrderSubscriptionService } from './order-subscription.service';
import { CouponModule } from '../coupon/coupon.module';
import { UpdateOrderInput } from './dto/update-order.input';
import { RiderOrderQueryService } from './rider-order.query-service';
import { CommonCouponModule } from 'src/coupon/common-coupon.module';
import { CarColorEntity } from 'src/entities/car-color.entity';
import { CarModelEntity } from 'src/entities/car-model.entity';
import { DriverTransactionEntity } from 'src/entities/driver-transaction.entity';
import { DriverWalletEntity } from 'src/entities/driver-wallet.entity';
import { DriverEntity } from 'src/entities/driver.entity';
import { FeedbackParameterEntity } from 'src/entities/feedback-parameter.entity';
import { FeedbackEntity } from 'src/entities/feedback.entity';
import { MediaEntity } from 'src/entities/media.entity';
import { ProviderTransactionEntity } from 'src/entities/provider-transaction.entity';
import { ProviderWalletEntity } from 'src/entities/provider-wallet.entity';
import { RegionEntity } from 'src/entities/region.entity';
import { RequestActivityEntity } from 'src/entities/request-activity.entity';
import { RequestEntity } from 'src/entities/request.entity';
import { ServiceCategoryEntity } from 'src/entities/service-category.entity';
import { ServiceOptionEntity } from 'src/entities/service-option.entity';
import { SOSEntity } from 'src/entities/sos.entity';
import { DriverNotificationService } from 'src/order/firebase-notification-service/driver-notification.service';
import { RiderNotificationService } from 'src/order/firebase-notification-service/rider-notification.service';
import { GoogleServicesModule } from 'src/order/google-services/google-services.module';
import { RegionModule } from 'src/order/region/region.module';
import { SharedDriverService } from 'src/order/shared-driver.service';
import { SharedOrderModule } from 'src/order/shared-order.module';
import { SharedOrderService } from 'src/order/shared-order.service';
import { SharedProviderService } from 'src/order/shared-provider.service';
import { RedisPubSubProvider } from 'src/redis-pub-sub.provider';
import { OrderRedisService } from 'src/redis/order-redis.service';
import { RedisHelpersModule } from 'src/redis/redis-helper.module';
import { FeedbackParameterDTO } from './dto/feedback-parameter.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RequestEntity,
      ProviderWalletEntity,
      ProviderTransactionEntity,
      DriverEntity,
      DriverWalletEntity,
      DriverTransactionEntity,
      FeedbackEntity,
      RequestActivityEntity,
      FeedbackParameterEntity,
      ServiceOptionEntity,
      SOSEntity,
    ]),
    CommonCouponModule,
    GoogleServicesModule,
    ServiceModule,
    RiderModule,
    RegionModule,
    forwardRef(() => CouponModule),
    RedisHelpersModule,
    SharedOrderModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          RequestEntity,
          DriverEntity,
          CarColorEntity,
          CarModelEntity,
          RegionEntity,
          ServiceCategoryEntity,
          MediaEntity,
          FeedbackParameterEntity,
          RequestActivityEntity,
          FeedbackEntity,
        ]),
        CommonCouponModule,
        SharedOrderModule,
      ],
      pubSub: RedisPubSubProvider.provider(),
      services: [
        RiderOrderQueryService,
        RiderOrderService,
        OrderRedisService,
        DriverNotificationService,
      ],
      resolvers: [
        {
          EntityClass: RequestEntity,
          DTOClass: OrderDTO,
          UpdateDTOClass: UpdateOrderInput,
          ServiceClass: RiderOrderQueryService,
          //Service: RiderOrderQueryService,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
        {
          EntityClass: DriverEntity,
          DTOClass: DriverDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: CarModelEntity,
          DTOClass: CarModelDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: CarColorEntity,
          DTOClass: CarColorDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: FeedbackParameterEntity,
          DTOClass: FeedbackParameterDTO,
          pagingStrategy: PagingStrategies.NONE,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { one: { disabled: true } },
        },
      ],
    }),
  ],
  providers: [
    OrderSubscriptionService,
    SharedProviderService,
    OrderResolver,
    SharedOrderService,
    RiderOrderService,
    SharedDriverService,
    DriverNotificationService,
    RiderNotificationService,
    RedisPubSubProvider.provider(),
  ],
  exports: [RiderOrderService],
})
export class OrderModule {}
