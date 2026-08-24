import {
  FilterableField,
  IDField,
  Relation,
} from '@nestjs-query/query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { OrderDTO } from '../../order/dto/order.dto';
import { MessageStatus } from 'src/entities/enums/message-status.enum';

@ObjectType('DriverOrderMessage')
@Relation('request', () => OrderDTO, {
  disableRemove: true,
  disableUpdate: true,
})
export class OrderMessageDTO {
  @IDField(() => ID)
  id!: number;
  sentAt!: Date;
  status!: MessageStatus;
  @Field()
  content!: string;
  sentByDriver!: boolean;
  @FilterableField(() => ID)
  requestId!: number;
}
