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
import { RedisHelpersModule } from 'src/redis/redis-helper.module';
import { CommonCouponModule } from 'src/coupon/common-coupon.module';
import { RequestEntity } from 'src/entities/request.entity';
import { ServiceCategoryEntity } from 'src/entities/service-category.entity';
import { ServiceOptionEntity } from 'src/entities/service-option.entity';
import { ServiceEntity } from 'src/entities/service.entity';
import { RiderWalletEntity } from 'src/entities/rider-wallet.entity';
import { RiderEntity } from 'src/entities/rider-entity';
import { RiderTransactionEntity } from 'src/entities/rider-transaction.entity';
import { DriverWalletEntity } from 'src/entities/driver-wallet.entity';
import { DriverEntity } from 'src/entities/driver.entity';
import { DriverTransactionEntity } from 'src/entities/driver-transaction.entity';
import { ProviderWalletEntity } from 'src/entities/provider-wallet.entity';
import { ProviderTransactionEntity } from 'src/entities/provider-transaction.entity';
import { FleetEntity } from 'src/entities/fleet.entity';
import { FleetTransactionEntity } from 'src/entities/fleet-transaction.entity';
import { FleetWalletEntity } from 'src/entities/fleet-wallet.entity';
import { SOSEntity } from 'src/entities/sos.entity';
import { RegionModule } from 'src/order/region/region.module';
import { FirebaseNotificationModule } from 'src/order/firebase-notification-service/firebase-notification-service.module';
import { GoogleServicesModule } from 'src/order/google-services/google-services.module';
import { RequestActivityEntity } from 'src/entities/request-activity.entity';
import { RedisPubSubProvider } from 'src/redis-pub-sub.provider';
import { SharedOrderService } from 'src/order/shared-order.service';
import { ServiceService } from 'src/order/service.service';
import { SharedRiderService } from 'src/order/shared-rider.service';
import { SharedDriverService } from 'src/order/shared-driver.service';
import { SharedProviderService } from 'src/order/shared-provider.service';
import { SharedFleetService } from 'src/order/shared-fleet.service';

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
