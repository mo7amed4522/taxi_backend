import { Authorize, IDField } from "@nestjs-query/query-graphql";
import { ID, ObjectType, Field } from "@nestjs/graphql";
import { CarAuthorizer } from "./car.authorizer";

@ObjectType('AdminCarColor')
@Authorize(CarAuthorizer)
export class CarColorDTO {
    @IDField(() => ID)
    id: number;
    @Field()
    name: string;
}