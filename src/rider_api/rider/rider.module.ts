import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { RiderDTO } from './dto/rider.dto';
import { UpdateRiderInput } from './dto/update-rider.input';
import { GqlAuthGuard } from '../auth/jwt-gql-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderEntity } from 'src/entities/rider-entity';
import { RiderTransactionEntity } from 'src/entities/rider-transaction.entity';
import { RiderWalletEntity } from 'src/entities/rider-wallet.entity';
import { SharedRiderService } from 'src/order/shared-rider.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RiderEntity,
      RiderWalletEntity,
      RiderTransactionEntity,
    ]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([RiderEntity])],
      resolvers: [
        {
          EntityClass: RiderEntity,
          DTOClass: RiderDTO,
          UpdateDTOClass: UpdateRiderInput,
          read: { many: { disabled: true } },
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
      ],
    }),
  ],
  providers: [SharedRiderService],
  exports: [SharedRiderService],
})
export class RiderModule {}
