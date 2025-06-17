import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from './config/database.config';
import { CarColorEntity } from './entities/car-color.entity';
import { CarModelEntity } from './entities/car-model.entity';
import { ComplaintActivityEntity } from './entities/complaint-activity.entity';
import { ComplaintEntity } from './entities/complaint.entity';
import { CouponEntity } from './entities/coupon.entity';
import { DriverTransactionEntity } from './entities/driver-transaction.entity';
import { DriverWalletEntity } from './entities/driver-wallet.entity';
import { DriverEntity } from './entities/driver.entity';
import { FeedbackParameterEntity } from './entities/feedback-parameter.entity';
import { FeedbackEntity } from './entities/feedback.entity';
import { FleetTransactionEntity } from './entities/fleet-transaction.entity';
import { FleetWalletEntity } from './entities/fleet-wallet.entity';
import { FleetEntity } from './entities/fleet.entity';
import { MediaEntity } from './entities/media.entity';
import { OperatorRoleEntity } from './entities/operator-role.entity';
import { OperatorEntity } from './entities/operator.entity';
import { OrderMessageEntity } from './entities/request-message.entity';
import { RequestEntity } from './entities/request.entity';
import { PaymentGatewayEntity } from './entities/payment-gateway.entity';
import { ProviderTransactionEntity } from './entities/provider-transaction.entity';
import { ProviderWalletEntity } from './entities/provider-wallet.entity';
import { RegionEntity } from './entities/region.entity';
import { RiderAddressEntity } from './entities/rider-address.entity';
import { RiderEntity } from './entities/rider-entity';
import { RiderTransactionEntity } from './entities/rider-transaction.entity';
import { RiderWalletEntity } from './entities/rider-wallet.entity';
import { ServiceCategoryEntity } from './entities/service-category.entity';
import { ServiceEntity } from './entities/service.entity';
import { PaymentEntity } from './entities/payment.entity';
import { ServiceOptionEntity } from './entities/service-option.entity';
import { GiftCardEntity } from './entities/gift-card.entity';
import { SOSEntity } from './entities/sos.entity';
import { SOSActivityEntity } from './entities/sos-activity.entity';
import { AnnouncementEntity } from './entities/announcement.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}

export const entities = [
  MediaEntity,
  OperatorEntity,
  OperatorRoleEntity,
  DriverEntity,
  ProviderTransactionEntity,
  ProviderWalletEntity,
  ComplaintActivityEntity,
  ComplaintEntity,
  CarModelEntity,
  CarColorEntity,
  DriverTransactionEntity,
  DriverWalletEntity,
  FeedbackParameterEntity,
  FeedbackEntity,
  FleetEntity,
  FleetWalletEntity,
  FleetTransactionEntity,
  RequestEntity,
  OrderMessageEntity,
  PaymentGatewayEntity,
  PaymentEntity,
  ServiceEntity,
  ServiceCategoryEntity,
  CouponEntity,
  RegionEntity,
  RiderEntity,
  RiderWalletEntity,
  RiderTransactionEntity,
  RiderAddressEntity,
  ServiceOptionEntity,
  GiftCardEntity,
  SOSEntity,
  SOSActivityEntity,
  AnnouncementEntity
];
