import { InputType } from "@nestjs/graphql";
import { Point } from "../../../index";

@InputType()
export class CalculateFareInput {
    points!: Point[];
    twoWay?: boolean;
    couponCode?: string;
    selectedOptionIds?: string[];
}