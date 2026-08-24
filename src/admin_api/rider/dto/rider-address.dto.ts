import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { RiderAddressType } from './../../../entities/enums/rider-address-type.enum';
import { Point } from './../../../interfaces/point';

@ObjectType('RiderAddress')
export class RiderAddressDTO {
  @IDField(() => ID)
  id: number;
  type: RiderAddressType;
  title: string;
  details?: string;
  location: Point;
  @FilterableField(() => ID)
  riderId: number;
}
