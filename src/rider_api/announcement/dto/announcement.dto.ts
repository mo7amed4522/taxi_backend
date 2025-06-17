import { Authorize, FilterableField, IDField } from "@nestjs-query/query-graphql";
import { ID, ObjectType } from "@nestjs/graphql";
import { AnnouncementUserType } from "src/entities/enums/anouncement-user-type.enum";

@ObjectType('Announcement')
@Authorize({
    authorize: () => ({userType: {in: [AnnouncementUserType.Rider]}, startAt: {lt: new Date() }, expireAt: {gt: new Date()} })
})
export class AnnouncementDTO {
    @IDField(() => ID)
    id: number;
    startAt: Date;
    expireAt: Date;
    title: string;
    description: string;
    url?: string;
    @FilterableField(() => AnnouncementUserType)
    userType: AnnouncementUserType;
}