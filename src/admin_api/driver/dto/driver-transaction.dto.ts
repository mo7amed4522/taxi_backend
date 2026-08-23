import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { OperatorDTO } from '../../operator/dto/operator.dto';
import { TransactionAction } from 'src/entities/enums/transaction-action.enum';
import { TransactionStatus } from 'src/entities/enums/transaction-status.enum';
import { DriverDeductTransactionType } from 'src/entities/enums/driver-deduct-transaction-type.enum';
import { DriverRechargeTransactionType } from 'src/entities/enums/driver-recharge-transaction-type.enum';

@ObjectType('DriverTransaction')
@Relation('operator', () => OperatorDTO, { nullable: true })
export class DriverTransactionDTO {
  @FilterableField()
  createdAt: Date;
  action: TransactionAction;
  status: TransactionStatus;
  deductType?: DriverDeductTransactionType;
  rechargeType?: DriverRechargeTransactionType;
  amount: number;
  currency: string;
  refrenceNumber?: string;
  @FilterableField(() => ID)
  driverId!: number;
  paymentGatewayId?: number;
  @Field(() => ID)
  operatorId?: number;
  requestId?: number;
  description?: string;
}
