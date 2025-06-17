import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedConfigurationService } from '../shared-configuration.service';
import { FirebaseNotificationModule } from 'src/order/firebase-notification-service/firebase-notification-service.module';
import { GoogleServicesModule } from './google-services/google-services.module';
import { RegionModule } from './region/region.module';
import { ServiceService } from './service.service';
import { SharedDriverService } from './shared-driver.service';
import { SharedFleetService } from './shared-fleet.service';
import { SharedOrderService } from './shared-order.service';
import { SharedProviderService } from './shared-provider.service';
import { SharedRiderService } from './shared-rider.service';
import { RedisHelpersModule } from 'src/redis/redis-helper.module';
import { CommonCouponModule } from 'src/coupon/common-coupon.module';
import { ServiceCategoryEntity } from 'src/entities/service-category.entity';
import { ServiceOptionEntity } from 'src/entities/service-option.entity';
import { ServiceEntity } from 'src/entities/service.entity';
import { RiderEntity } from 'src/entities/rider-entity';
import { DriverEntity } from 'src/entities/driver.entity';
import { DriverWalletEntity } from 'src/entities/driver-wallet.entity';
import { DriverTransactionEntity } from 'src/entities/driver-transaction.entity';
import { FleetEntity } from 'src/entities/fleet.entity';
import { FleetWalletEntity } from 'src/entities/fleet-wallet.entity';
import { FleetTransactionEntity } from 'src/entities/fleet-transaction.entity';
import { ProviderWalletEntity } from 'src/entities/provider-wallet.entity';
import { ProviderTransactionEntity } from 'src/entities/provider-transaction.entity';
import { RiderWalletEntity } from 'src/entities/rider-wallet.entity';
import { RiderTransactionEntity } from 'src/entities/rider-transaction.entity';
import { RequestEntity } from 'src/entities/request.entity';
import { RequestActivityEntity } from 'src/entities/request-activity.entity';
import { RedisPubSubProvider } from 'src/redis-pub-sub.provider';

@Module({
  imports: [
      RedisHelpersModule,
      CommonCouponModule,
    TypeOrmModule.forFeature([
      ServiceCategoryEntity,
      ServiceOptionEntity,
      ServiceEntity,
      RiderEntity,
      DriverEntity,
      DriverWalletEntity,
      DriverTransactionEntity,
      FleetEntity,
      FleetWalletEntity,
      FleetTransactionEntity,
      ProviderWalletEntity,
      ProviderTransactionEntity,
      RiderWalletEntity,
      RiderTransactionEntity,
      RequestEntity,
      RequestActivityEntity,
      
    ]),
    RegionModule,
    GoogleServicesModule,
    FirebaseNotificationModule,
  ],
  providers: [
    RedisPubSubProvider.provider(),
    ServiceService,
    SharedDriverService,
    SharedFleetService,
    SharedOrderService,
    SharedProviderService,
    SharedRiderService,
    SharedConfigurationService
  ],
  exports: [
    SharedDriverService,
    SharedFleetService,
    SharedOrderService,
    SharedProviderService,
    SharedRiderService,
  ],
})
export class SharedOrderModule {}
