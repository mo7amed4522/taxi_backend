import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';

import { UploadModule } from '../upload/upload.module';
import { ServiceDTO } from './dto/service.dto';
import { ServiceEntity } from './../../entities/service.entity';
import { ServiceCategoryEntity } from './../../entities/service-category.entity';
import { MediaEntity } from './../../entities/media.entity';
import { ServiceService } from './../../order/service.service';

@Module({
  imports: [
    UploadModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ServiceEntity,
          ServiceCategoryEntity,
          MediaEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: ServiceEntity,
          DTOClass: ServiceDTO,
          create: { disabled: true },
          read: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
        },
        // {
        //     EntityClass: ServiceCategoryEntity,
        //     DTOClass: ServiceCategoryDTO,
        //     pagingStrategy: PagingStrategies.NONE,
        //     create: { disabled: true },
        //     read: { one: { disabled: true } },
        //     update: { disabled: true },
        //     delete: { disabled: true },
        // }
      ],
    }),
  ],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
