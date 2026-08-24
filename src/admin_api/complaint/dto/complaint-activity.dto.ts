import {
  FilterableField,
  IDField,
  Relation,
} from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { OperatorDTO } from '../../operator/dto/operator.dto';
import { ComplaintActivityType } from './../../../entities/enums/complaint-activity-type.enum';

@ObjectType('ComplaintActivity')
@Relation('actor', () => OperatorDTO)
@Relation('assignedTo', () => OperatorDTO, { nullable: true })
export class ComplaintActivityDTO {
  @IDField(() => ID)
  id!: number;
  type!: ComplaintActivityType;
  comment?: string;
  @FilterableField(() => ID)
  complaintId!: number;
}
