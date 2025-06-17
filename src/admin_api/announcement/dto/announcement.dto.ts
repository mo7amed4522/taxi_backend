import { Authorize, FilterableField, IDField } from "@nestjs-query/query-graphql";
import { ID, ObjectType, Field } from "@nestjs/graphql";
import { AnnouncementAuthorizer } from "./announcement.authorizer";
import { AnnouncementUserType } from "src/entities/enums/anouncement-user-type.enum";

@ObjectType('AdminAnnouncement')
@Authorize(AnnouncementAuthorizer)
export class AnnouncementDTO {
    @IDField(() => ID)
    id!: number;
    @Field()
    title: string;
    description: string;
    url?: string;
    userType: AnnouncementUserType[];
    startAt: Date;
    expireAt: Date;
}