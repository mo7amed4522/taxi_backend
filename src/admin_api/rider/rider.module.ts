import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RiderAddressDTO } from './dto/rider-address.dto';

import { RiderTransactionDTO } from './dto/rider-transaction.dto';
import { RiderWalletDTO } from './dto/rider-wallet.dto';
import { RiderDTO } from './dto/rider.dto';
import { RiderResolver } from './rider.resolver';
import { RiderEntity } from 'src/entities/rider-entity';
import { RiderWalletEntity } from 'src/entities/rider-wallet.entity';
import { RiderTransactionEntity } from 'src/entities/rider-transaction.entity';
import { RiderAddressEntity } from 'src/entities/rider-address.entity';
import { SharedRiderService } from 'src/order/shared-rider.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          RiderEntity,
          RiderWalletEntity,
          RiderTransactionEntity,
          RiderAddressEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: RiderEntity,
          DTOClass: RiderDTO,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: RiderWalletEntity,
          DTOClass: RiderWalletDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: RiderTransactionEntity,
          DTOClass: RiderTransactionDTO,
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: RiderAddressEntity,
          DTOClass: RiderAddressDTO,
          create: { many: { disabled: true } },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
  providers: [RiderResolver, SharedRiderService],
})
export class RiderModule {}
