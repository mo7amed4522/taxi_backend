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
import { CommonCouponModule } from './../../coupon/common-coupon.module';
import { CarColorEntity } from './../../entities/car-color.entity';
import { CarModelEntity } from './../../entities/car-model.entity';
import { DriverTransactionEntity } from './../../entities/driver-transaction.entity';
import { DriverWalletEntity } from './../../entities/driver-wallet.entity';
import { DriverEntity } from './../../entities/driver.entity';
import { FeedbackParameterEntity } from './../../entities/feedback-parameter.entity';
import { FeedbackEntity } from './../../entities/feedback.entity';
import { MediaEntity } from './../../entities/media.entity';
import { ProviderTransactionEntity } from './../../entities/provider-transaction.entity';
import { ProviderWalletEntity } from './../../entities/provider-wallet.entity';
import { RegionEntity } from './../../entities/region.entity';
import { RequestActivityEntity } from './../../entities/request-activity.entity';
import { RequestEntity } from './../../entities/request.entity';
import { ServiceCategoryEntity } from './../../entities/service-category.entity';
import { ServiceOptionEntity } from './../../entities/service-option.entity';
import { SOSEntity } from './../../entities/sos.entity';
import { DriverNotificationService } from './../../order/firebase-notification-service/driver-notification.service';
import { RiderNotificationService } from './../../order/firebase-notification-service/rider-notification.service';
import { GoogleServicesModule } from './../../order/google-services/google-services.module';
import { RegionModule } from './../../order/region/region.module';
import { SharedDriverService } from './../../order/shared-driver.service';
import { SharedOrderModule } from './../../order/shared-order.module';
import { SharedOrderService } from './../../order/shared-order.service';
import { SharedProviderService } from './../../order/shared-provider.service';
import { RedisPubSubProvider } from './../../redis-pub-sub.provider';
import { OrderRedisService } from './../../redis/order-redis.service';
import { RedisHelpersModule } from './../../redis/redis-helper.module';
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
