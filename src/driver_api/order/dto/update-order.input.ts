import { InputType, Field } from '@nestjs/graphql';
import { OrderStatus } from 'src/entities/enums/order-status.enum';

@InputType()
export class UpdateOrderInput {
  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field({ nullable: true })
  paidAmount?: number;
}
