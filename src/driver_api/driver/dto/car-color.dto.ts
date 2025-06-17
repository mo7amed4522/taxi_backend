import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IDField } from '@nestjs-query/query-graphql';

@ObjectType('DriverCarColor')
export class CarColorDTO {
    @IDField(() => ID)
    id: number;
    @Field()
    name: string;
}