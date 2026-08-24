import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GqlAuthGuard } from '../auth/jwt-gql-auth.guard';
import { DriverTransactionDTO } from './dto/driver-transaction.dto';
import { DriverWalletDTO } from './dto/driver-wallet.dto';
import { PaymentGatewayDTO } from './dto/payment-gateway.dto';
import { EarningsService } from './earnings.service';
import { WalletResolver } from './wallet-resolver';
import { RequestEntity } from './../../entities/request.entity';
import { DriverTransactionEntity } from './../../entities/driver-transaction.entity';
import { DriverWalletEntity } from './../../entities/driver-wallet.entity';
import { PaymentGatewayEntity } from './../../entities/payment-gateway.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          DriverTransactionEntity,
          DriverWalletEntity,
          PaymentGatewayEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: DriverTransactionEntity,
          DTOClass: DriverTransactionDTO,
          read: { one: { disabled: true } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
        {
          EntityClass: DriverWalletEntity,
          DTOClass: DriverWalletDTO,
          read: { one: { disabled: true } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
          pagingStrategy: PagingStrategies.NONE,
        },
        {
          EntityClass: PaymentGatewayEntity,
          DTOClass: PaymentGatewayDTO,
          read: { one: { disabled: true } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
        },
      ],
    }),
  ],
  providers: [WalletResolver, EarningsService],
})
export class WalletModule {}
