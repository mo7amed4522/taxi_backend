import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { MediaDTO } from './media.dto';
import { UploadService } from './upload.service';
import { MediaEntity } from 'src/entities/media.entity';
import { DriverEntity } from 'src/entities/driver.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([MediaEntity, DriverEntity])],
      resolvers: [
        {
          EntityClass: MediaEntity,
          DTOClass: MediaDTO,
          create: { disabled: true },
          read: { disabled: true },
          delete: { disabled: true },
          update: { disabled: true }
        }
      ]
    })
  ],
  providers: [UploadService],
  exports: [UploadService, NestjsQueryGraphQLModule]
})
export class UploadModule {}
