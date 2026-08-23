import { IDField } from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';

@ObjectType('DriverCarModel')
export class CarModelDTO {
  @IDField(() => ID)
  id: number;
  name: string;
}
