import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';


import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OperatorModule } from '../operator/operator.module';
import { ServiceCategoryDTO } from './dto/service-category.dto';
import { ServiceOptionDTO } from './dto/service-option.dto';
import { ServiceDTO } from './dto/service.dto';
import { ServiceCategoryQueryService } from './service-category-query.service';
import { ServiceOptionQueryService } from './service-option-query.service';
import { ServiceQueryService } from './service-query.service';
import { ServiceCategoryEntity } from 'src/entities/service-category.entity';
import { ServiceEntity } from 'src/entities/service.entity';
import { ServiceOptionEntity } from 'src/entities/service-option.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ServiceCategoryEntity,
          ServiceEntity,
          ServiceOptionEntity
        ]),
        OperatorModule,
      ],
      services: [ServiceQueryService, ServiceCategoryQueryService, ServiceOptionQueryService],
      resolvers: [
        {
          EntityClass: ServiceEntity,
          DTOClass: ServiceDTO,
          ServiceClass: ServiceQueryService,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.NONE,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: ServiceCategoryEntity,
          DTOClass: ServiceCategoryDTO,
          ServiceClass: ServiceCategoryQueryService,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.NONE,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: ServiceOptionEntity,
          DTOClass: ServiceOptionDTO,
          ServiceClass: ServiceOptionQueryService,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.NONE,
          guards: [JwtAuthGuard]
        }
      ],
    }),
  ],
})
export class ServiceModule {}
