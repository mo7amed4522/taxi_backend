import { IDField } from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { Point } from 'src/interfaces/point';

@ObjectType('Address')
export class AddressDTO {
  @IDField(() => ID)
  id!: number;
  title!: string;
  details?: string;
  location!: Point;
}
