import {
  IDField,
  Relation,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';

import { OrderDTO } from '../../order/dto/order.dto';
import { SOSActivityDTO } from './sos-activity.dto';
import { SOSStatus } from './../../../entities/enums/sos-status.enum';
import { Point } from './../../../interfaces/point';

@ObjectType('DistressSignal')
@UnPagedRelation('activities', () => SOSActivityDTO)
@Relation('order', () => OrderDTO, { relationName: 'request' })
export class SOSDTO {
  @IDField(() => ID)
  id: number;
  createdAt: Date;
  status: SOSStatus;
  location?: Point;
  submittedByRider!: boolean;
  requestId: number;
}
