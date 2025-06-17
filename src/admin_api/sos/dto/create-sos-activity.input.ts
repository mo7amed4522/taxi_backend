import { Field, ID, InputType } from "@nestjs/graphql";
import { SOSActivityAction } from "src/entities/enums/sos-activity-action.enum";

@InputType()
export class CreateSOSAcitivtyInput {
    action: SOSActivityAction;
    note?: string;
    @Field(() => ID)
    sosId: number;
}