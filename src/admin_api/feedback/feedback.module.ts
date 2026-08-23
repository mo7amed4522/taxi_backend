import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FeedbackParameterDTO } from './dto/feedback-parameter.dto';
import { FeedbackDTO } from './dto/feedback.dto';
import { FeedbackEntity } from 'src/entities/feedback.entity';
import { FeedbackParameterEntity } from 'src/entities/feedback-parameter.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          FeedbackEntity,
          FeedbackParameterEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: FeedbackEntity,
          DTOClass: FeedbackDTO,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: FeedbackParameterEntity,
          DTOClass: FeedbackParameterDTO,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.NONE,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
})
export class FeedbackModule {}
