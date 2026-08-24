import { IDField } from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { RequestActivityType } from 'src/entities/enums/request-activity-type.enum';

@ObjectType('RequestActivity')
export class RequestActivityDTO {
  @IDField(() => ID)
  id!: number;
  createdAt!: Date;
  type!: RequestActivityType;
}
