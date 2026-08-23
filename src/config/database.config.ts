import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { RiderEntity } from '../entities/rider-entity';
import { RiderTransactionEntity } from '../entities/rider-transaction.entity';
import { RiderWalletEntity } from '../entities/rider-wallet.entity';
import { DriverEntity } from '../entities/driver.entity';
import { DriverTransactionEntity } from '../entities/driver-transaction.entity';
import { RequestEntity } from '../entities/request.entity';
import { OperatorEntity } from '../entities/operator.entity';
import { PaymentGatewayEntity } from '../entities/payment-gateway.entity';
import { GiftCardEntity } from '../entities/gift-card.entity';
import { RiderAddressEntity } from '../entities/rider-address.entity';
import { ServiceEntity } from '../entities/service.entity';
import { FleetEntity } from '../entities/fleet.entity';
import { FleetTransactionEntity } from '../entities/fleet-transaction.entity';
import { ProviderTransactionEntity } from '../entities/provider-transaction.entity';
import { MediaEntity } from '../entities/media.entity';
import { OrderMessageEntity } from '../entities/request-message.entity';
import { RequestActivityEntity } from '../entities/request-activity.entity';
import { ServiceOptionEntity } from '../entities/service-option.entity';
import { CouponEntity } from '../entities/coupon.entity';
import { ComplaintEntity } from '../entities/complaint.entity';
import { FeedbackEntity } from '../entities/feedback.entity';
import { SOSEntity } from '../entities/sos.entity';
import { FeedbackParameterEntity } from '../entities/feedback-parameter.entity';
import { CarColorEntity } from '../entities/car-color.entity';
import { CarModelEntity } from '../entities/car-model.entity';
import { ComplaintActivityEntity } from '../entities/complaint-activity.entity';
import { DriverWalletEntity } from '../entities/driver-wallet.entity';
import { ServiceCategoryEntity } from '../entities/service-category.entity';
import { PaymentEntity } from '../entities/payment.entity';
import { RegionEntity } from '../entities/region.entity';
import { FleetWalletEntity } from '../entities/fleet-wallet.entity';
import { OperatorRoleEntity } from '../entities/operator-role.entity';
import { SOSActivityEntity } from '../entities/sos-activity.entity';
import { AnnouncementEntity } from '../entities/announcement.entity';
import { ProviderWalletEntity } from '../entities/provider-wallet.entity';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('config.database.host') || 'localhost',
  port: configService.get<number>('config.database.port') || 5432,
  username: configService.get<string>('config.database.username') || 'postgres',
  password: configService.get<string>('config.database.password') || '2521',
  database:
    configService.get<string>('config.database.database') || 'taxi_backend',
  entities: [
    // Load FeedbackParameterEntity first to resolve circular dependency
    FeedbackParameterEntity,
    // Then load all other entities
    FleetWalletEntity,
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
    FeedbackEntity,
    FleetEntity,
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
    AnnouncementEntity,
    RequestActivityEntity,
  ],
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production',
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : false,
  extra: {
    max: 20,
    connectionTimeoutMillis: 5000,
  },
});

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'taxi',
  entities: ['src/entities/*.entity.ts', 'src/entities/*-entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
