import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDTO } from './dto/order.dto';
import { OrderResolver } from './order.resolver';
import { DriverOrderQueryService } from './driver-order.query-service';
import { CronJobService } from './cron-job.service';
import { DriverModule } from '../driver/driver.module';
import { OrderService } from './order.service';
import { OrderSubscriptionService } from './orde-subscription.service';
import { RiderDTO } from './dto/rider.dto';
import { RedisHelpersModule } from './../../redis/redis-helper.module';
import { CommonCouponModule } from './../../coupon/common-coupon.module';
import { RequestEntity } from './../../entities/request.entity';
import { ServiceCategoryEntity } from './../../entities/service-category.entity';
import { ServiceOptionEntity } from './../../entities/service-option.entity';
import { ServiceEntity } from './../../entities/service.entity';
import { RiderWalletEntity } from './../../entities/rider-wallet.entity';
import { RiderEntity } from './../../entities/rider-entity';
import { RiderTransactionEntity } from './../../entities/rider-transaction.entity';
import { DriverWalletEntity } from './../../entities/driver-wallet.entity';
import { DriverEntity } from './../../entities/driver.entity';
import { DriverTransactionEntity } from './../../entities/driver-transaction.entity';
import { ProviderWalletEntity } from './../../entities/provider-wallet.entity';
import { ProviderTransactionEntity } from './../../entities/provider-transaction.entity';
import { FleetEntity } from './../../entities/fleet.entity';
import { FleetTransactionEntity } from './../../entities/fleet-transaction.entity';
import { FleetWalletEntity } from './../../entities/fleet-wallet.entity';
import { SOSEntity } from './../../entities/sos.entity';
import { RegionModule } from './../../order/region/region.module';
import { FirebaseNotificationModule } from './../../order/firebase-notification-service/firebase-notification-service.module';
import { GoogleServicesModule } from './../../order/google-services/google-services.module';
import { RequestActivityEntity } from './../../entities/request-activity.entity';
import { RedisPubSubProvider } from './../../redis-pub-sub.provider';
import { SharedOrderService } from './../../order/shared-order.service';
import { ServiceService } from './../../order/service.service';
import { SharedRiderService } from './../../order/shared-rider.service';
import { SharedDriverService } from './../../order/shared-driver.service';
import { SharedProviderService } from './../../order/shared-provider.service';
import { SharedFleetService } from './../../order/shared-fleet.service';

@Module({
  imports: [
    RedisHelpersModule,
    DriverModule,
    CommonCouponModule,
    TypeOrmModule.forFeature([
      RequestEntity,
      ServiceCategoryEntity,
      ServiceOptionEntity,
      ServiceEntity,
      RiderEntity,
      RiderWalletEntity,
      RiderTransactionEntity,
      DriverEntity,
      DriverWalletEntity,
      DriverTransactionEntity,
      ProviderWalletEntity,
      ProviderTransactionEntity,
      FleetEntity,
      FleetWalletEntity,
      FleetTransactionEntity,
      SOSEntity,
    ]),
    RegionModule,
    FirebaseNotificationModule,
    GoogleServicesModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          RequestEntity,
          RiderEntity,
          RequestActivityEntity,
        ]),
      ],
      pubSub: RedisPubSubProvider.provider(),
      dtos: [{ DTOClass: OrderDTO }],
      resolvers: [
        {
          DTOClass: RiderDTO,
          EntityClass: RiderEntity,
          read: { disabled: true },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
        },
      ],
    }),
  ],
  providers: [
    OrderSubscriptionService,
    SharedOrderService,
    DriverOrderQueryService,
    OrderResolver,
    OrderService,
    ServiceService,
    SharedRiderService,
    SharedDriverService,
    SharedProviderService,
    SharedFleetService,
    RedisPubSubProvider.provider(),
    CronJobService,
  ],
  exports: [DriverOrderQueryService, SharedDriverService],
})
export class OrderModule {}
