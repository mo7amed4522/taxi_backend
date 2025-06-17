import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";
import { Point } from "../../interfaces/point";

@ObjectType()
@InputType('GraphQLPointInput')
export class GraphQLPoint extends Point {
    @Field(() => [Float])
    declare coordinates: [number, number];
} 