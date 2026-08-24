import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverService } from './driver.service';
import { DriverDTO } from './dto/driver.dto';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { CarModelDTO } from './dto/car-model.dto';
import { CarColorDTO } from './dto/car-color.dto';
import { GqlAuthGuard } from '../auth/jwt-gql-auth.guard';
import { UploadModule } from '../upload/upload.module';
import { DriverQueryService } from './driver-query.service';
import { UpdateDriverInput } from './dto/update-driver.input';
import { RedisHelpersModule } from './../../redis/redis-helper.module';
import { DriverEntity } from './../../entities/driver.entity';
import { CarModelEntity } from './../../entities/car-model.entity';
import { CarColorEntity } from './../../entities/car-color.entity';
import { MediaEntity } from './../../entities/media.entity';
import { ServiceEntity } from './../../entities/service.entity';

@Module({
  imports: [
    RedisHelpersModule,
    UploadModule,
    TypeOrmModule.forFeature([DriverEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        RedisHelpersModule,
        NestjsQueryTypeOrmModule.forFeature([
          DriverEntity,
          CarModelEntity,
          CarColorEntity,
          MediaEntity,
          ServiceEntity,
        ]),
      ],
      services: [DriverQueryService],
      resolvers: [
        {
          EntityClass: DriverEntity,
          DTOClass: DriverDTO,
          ServiceClass: DriverQueryService,
          UpdateDTOClass: UpdateDriverInput,
          read: { many: { disabled: true } },
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
        {
          EntityClass: CarModelEntity,
          DTOClass: CarModelDTO,
          create: { disabled: true },
          read: { one: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
        },
        {
          EntityClass: CarColorEntity,
          DTOClass: CarColorDTO,
          create: { disabled: true },
          read: { one: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
        },
      ],
    }),
  ],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
