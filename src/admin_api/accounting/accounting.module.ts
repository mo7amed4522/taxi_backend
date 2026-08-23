import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountingResolver } from './accounting.resolver';
import { AccountingService } from './accounting.service';
import { ProviderTransactionDTO } from './dto/provider-transaction.dto';
import { ProviderWalletDTO } from './dto/provider-wallet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProviderTransactionEntity } from 'src/entities/provider-transaction.entity';
import { RequestEntity } from 'src/entities/request.entity';
import { ProviderWalletEntity } from 'src/entities/provider-wallet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderTransactionEntity, RequestEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ProviderTransactionEntity,
          ProviderWalletEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: ProviderTransactionEntity,
          DTOClass: ProviderTransactionDTO,
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: ProviderWalletEntity,
          DTOClass: ProviderWalletDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
  providers: [AccountingService, AccountingResolver],
})
export class AccountingModule {}
