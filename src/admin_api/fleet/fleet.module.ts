import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FleetTransactionDTO } from './dto/fleet-transaction.dto';
import { FleetWalletDTO } from './dto/fleet-wallet.dto';
import { FleetDTO } from './dto/fleet.dto';
import { FleetResolver } from './fleet.resolver';
import { FleetEntity } from 'src/entities/fleet.entity';
import { FleetTransactionEntity } from 'src/entities/fleet-transaction.entity';
import { FleetWalletEntity } from 'src/entities/fleet-wallet.entity';
import { SharedFleetService } from 'src/order/shared-fleet.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          FleetEntity,
          FleetTransactionEntity,
          FleetWalletEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: FleetEntity,
          DTOClass: FleetDTO,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: FleetWalletEntity,
          DTOClass: FleetWalletDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: FleetTransactionEntity,
          DTOClass: FleetTransactionDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
  providers: [FleetResolver, SharedFleetService],
})
export class FleetModule {}
