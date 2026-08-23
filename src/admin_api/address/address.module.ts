import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddressDTO } from './dto/address.dto';
import { RiderAddressEntity } from 'src/entities/rider-address.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([RiderAddressEntity])],
      resolvers: [
        {
          EntityClass: RiderAddressEntity,
          DTOClass: AddressDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
})
export class AddressModule {}
