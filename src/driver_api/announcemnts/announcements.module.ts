import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-gql-auth.guard';
import { AnnouncementDTO, AnnouncementAuthorizer } from './dto/announcement.dto';
import { AnnouncementEntity } from 'src/entities/announcement.entity';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([AnnouncementEntity])],
            resolvers: [
              {
                EntityClass: AnnouncementEntity,
                DTOClass: AnnouncementDTO,
                read: { one: { disabled: true } },
                create: { disabled: true },
                update:  { disabled: true },
                delete: { disabled: true },
                guards: [GqlAuthGuard]
              }
            ],
          })
    ],
    providers: [AnnouncementAuthorizer]
})
export class AnnouncementsModule {}
