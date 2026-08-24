import {
  Authorize,
  IDField,
  PagingStrategies,
  QueryOptions,
  CustomAuthorizer,
  AuthorizationContext,
} from '@nestjs-query/query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { AnnouncementUserType } from './../../../entities/enums/anouncement-user-type.enum';
import { Injectable } from '@nestjs/common';
import { Filter } from '@nestjs-query/core';

@Injectable()
export class AnnouncementAuthorizer implements CustomAuthorizer<any> {
  async authorize(): Promise<Filter<any>> {
    return {
      userType: { '@': AnnouncementUserType.Driver },
      startAt: { lt: new Date() },
      expireAt: { gt: new Date() },
    };
  }
}

@ObjectType('DriverAnnouncement')
@QueryOptions({
  pagingStrategy: PagingStrategies.NONE,
})
@Authorize(AnnouncementAuthorizer)
export class AnnouncementDTO {
  @IDField(() => ID)
  id!: number;
  @Field()
  title!: string;
  description!: string;
  startAt!: Date;
  expireAt!: Date;
  url?: string;
  @Field(() => [AnnouncementUserType])
  userType!: AnnouncementUserType[];
}
