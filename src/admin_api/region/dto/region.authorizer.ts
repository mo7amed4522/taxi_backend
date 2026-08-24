import { Filter } from '@nestjs-query/core';
import {
  CustomAuthorizer,
  AuthorizationContext,
} from '@nestjs-query/query-graphql';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { UserContext } from '../../auth/authenticated-admin';
import { OperatorEntity } from './../../../entities/operator.entity';
import { OperatorPermission } from './../../../entities/enums/operator-permission.enum';

@Injectable()
export class RegionAuthorizer implements CustomAuthorizer<any> {
  async authorize(
    context: UserContext,
    authorizerContext: AuthorizationContext,
  ): Promise<Filter<any>> {
    const operator = await getRepository(OperatorEntity).findOne({
      where: { id: context.req.user.id },
      relations: ['role'],
    });
    if (!operator || !operator.role) {
      throw new UnauthorizedException();
    }
    if (
      authorizerContext.readonly &&
      !operator.role.permissions.includes(OperatorPermission.Regions_View)
    ) {
      throw new UnauthorizedException();
    }
    if (
      !authorizerContext.readonly &&
      !operator.role.permissions.includes(OperatorPermission.Regions_Edit)
    ) {
      throw new UnauthorizedException();
    }
    return {};
  }
}
