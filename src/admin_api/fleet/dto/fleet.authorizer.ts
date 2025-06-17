import { Filter } from "@nestjs-query/core";
import { CustomAuthorizer, AuthorizationContext } from "@nestjs-query/query-graphql";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { getRepository } from "typeorm";
import { UserContext } from "../../auth/authenticated-admin";
import { OperatorPermission } from "src/entities/enums/operator-permission.enum";
import { OperatorEntity } from "src/entities/operator.entity";

@Injectable()
export class FleetAuthorizer implements CustomAuthorizer<any> {
    
    async authorize(context: UserContext, authorizerContext: AuthorizationContext): Promise<Filter<any>> {
        const operator = await getRepository(OperatorEntity).findOne({ where: { id: context.req.user.id }, relations: ['role'] });
        if (!operator || !operator.role) {
            throw new UnauthorizedException();
        }
        if (authorizerContext.readonly && !operator.role.permissions.includes(OperatorPermission.Fleets_View)) {
            throw new UnauthorizedException();
        }
        if(!authorizerContext.readonly && !operator.role.permissions.includes(OperatorPermission.Fleets_Edit)) {
            throw new UnauthorizedException();
        }
        return {};
    }
}