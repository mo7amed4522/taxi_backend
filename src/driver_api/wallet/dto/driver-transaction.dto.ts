import {
  Authorize,
  FilterableField,
  IDField,
} from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';

import { UserContext } from '../../auth/authenticated-user';
import { TransactionAction } from 'src/entities/enums/transaction-action.enum';
import { DriverDeductTransactionType } from 'src/entities/enums/driver-deduct-transaction-type.enum';
import { DriverRechargeTransactionType } from 'src/entities/enums/driver-recharge-transaction-type.enum';

@ObjectType('DriverTransacion')
@Authorize({
  authorize: (context: UserContext) => ({
    driverId: { eq: context.req.user.id },
  }),
})
export class DriverTransactionDTO {
  @IDField(() => ID)
  id: number;
  createdAt: Date;
  action: TransactionAction;
  deductType?: DriverDeductTransactionType;
  rechargeType?: DriverRechargeTransactionType;
  amount!: number;
  currency: string;
  refrenceNumber?: string;
  @FilterableField(() => ID, { filterOnly: true })
  driverId: number;
}
