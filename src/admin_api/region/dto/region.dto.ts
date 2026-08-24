import {
  Authorize,
  FilterableField,
  IDField,
} from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { RegionAuthorizer } from './region.authorizer';
import { Point } from 'src/interfaces/point';

@ObjectType('Region')
@Authorize(RegionAuthorizer)
export class RegionDTO {
  @IDField(() => ID)
  id!: number;
  name!: string;
  @FilterableField(() => String)
  currency!: string;
  enabled!: boolean;
  location!: Point[][];
}
