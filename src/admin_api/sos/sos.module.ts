import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSOSAcitivtyInput } from './dto/create-sos-activity.input';
import { SOSActivityDTO } from './dto/sos-activity.dto';
import { SOSDTO } from './dto/sos.dto';
import { SOSActivityQueryService } from './sos-acitivty-query.service';
import { SOSEntity } from './../../entities/sos.entity';
import { SOSActivityEntity } from './../../entities/sos-activity.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([SOSEntity, SOSActivityEntity]),
      ],
      services: [SOSActivityQueryService],
      resolvers: [
        {
          EntityClass: SOSEntity,
          DTOClass: SOSDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: SOSActivityEntity,
          DTOClass: SOSActivityDTO,
          CreateDTOClass: CreateSOSAcitivtyInput,
          ServiceClass: SOSActivityQueryService,
          read: { disabled: true },
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
})
export class SOSModule {}
