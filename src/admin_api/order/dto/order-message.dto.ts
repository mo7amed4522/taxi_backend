import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IDField } from '@nestjs-query/query-graphql';
import { MessageStatus } from './../../../entities/enums/message-status.enum';

@ObjectType('AdminOrderMessage')
export class OrderMessageDTO {
  @IDField(() => ID)
  id!: number;
  @Field()
  content!: string;
  sentAt!: Date;
  sentByDriver!: boolean;
  status!: MessageStatus;
}
