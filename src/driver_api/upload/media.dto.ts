import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IDField } from '@nestjs-query/query-graphql';

@ObjectType('DriverMedia')
export class MediaDTO {
    @IDField(() => ID)
    id: number;
    @Field()
    address: string;
    @Field()
    type: string;
}