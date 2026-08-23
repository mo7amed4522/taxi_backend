import { IDField, Relation } from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { OperatorDTO } from '../../operator/dto/operator.dto';
import { SOSActivityAction } from 'src/entities/enums/sos-activity-action.enum';

@ObjectType('SOSActivity')
@Relation('operator', () => OperatorDTO)
export class SOSActivityDTO {
  @IDField(() => ID)
  id: number;
  createdAt: Date;
  action: SOSActivityAction;
  note?: string;
  operatorId?: number;
}
