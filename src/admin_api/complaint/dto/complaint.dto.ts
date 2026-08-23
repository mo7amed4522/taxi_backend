import {
  FilterableField,
  IDField,
  PagingStrategies,
  Relation,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { OrderDTO } from '../../order/dto/order.dto';
import { ComplaintActivityDTO } from './complaint-activity.dto';
import { ComplaintStatus } from 'src/entities/enums/complaint-status.enum';

@ObjectType('AdminComplaint')
@UnPagedRelation('activities', () => ComplaintActivityDTO, {
  pagingStrategy: PagingStrategies.NONE,
})
@Relation('order', () => OrderDTO, { relationName: 'request' })
export class ComplaintDTO {
  @IDField(() => ID)
  id!: number;
  inscriptionTimestamp!: Date;
  requestedByDriver: boolean;
  @Field()
  subject: string;
  @Field()
  description: string;
  content?: string;
  @FilterableField(() => ComplaintStatus)
  status: ComplaintStatus;
  @FilterableField(() => ID)
  requestId: number;
}
