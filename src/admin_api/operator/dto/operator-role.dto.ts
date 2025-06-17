import { Authorize, IDField } from "@nestjs-query/query-graphql";
import { ID, ObjectType } from "@nestjs/graphql";
import { OperatorAuthorizer } from "./operator.authorizer";
import { OperatorPermission } from "src/entities/enums/operator-permission.enum";

@ObjectType('OperatorRole')
@Authorize(OperatorAuthorizer)
export class OperatorRoleDTO {
    @IDField(() => ID)
    id!: number;
    title!: string;
    permissions: OperatorPermission[];
}