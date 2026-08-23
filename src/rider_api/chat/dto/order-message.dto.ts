import {
  Authorize,
  FilterableField,
  IDField,
  Relation,
} from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { OrderDTO } from '../../order/dto/order.dto';
import { MessageStatus } from 'src/entities/enums/message-status.enum';

@ObjectType('OrderMessage')
@Relation('request', () => OrderDTO, {
  disableRemove: true,
  disableUpdate: true,
})
export class OrderMessageDTO {
  @IDField(() => ID)
  id: number;
  sentAt!: Date;
  status: MessageStatus;
  content: string;
  sentByDriver: boolean;
  @FilterableField(() => ID)
  requestId: number;
}
