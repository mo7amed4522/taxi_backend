import { Inject, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, Mutation, Resolver } from '@nestjs/graphql';
import { UserContext } from '../auth/authenticated-admin';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FleetTransactionInput } from './dto/fleet-transaction.input';
import { FleetWalletDTO } from './dto/fleet-wallet.dto';
import { TransactionAction } from './../../entities/enums/transaction-action.enum';
import { SharedFleetService } from './../../order/shared-fleet.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class FleetResolver {
  constructor(
    private sharedFleetService: SharedFleetService,
    @Inject(CONTEXT)
    private context: UserContext,
  ) {}

  @Mutation(() => FleetWalletDTO)
  async createFleetTransaction(
    @Args('input', { type: () => FleetTransactionInput })
    input: FleetTransactionInput,
  ) {
    input.amount =
      input.action == TransactionAction.Recharge
        ? Math.abs(input.amount)
        : Math.abs(input.amount) * -1;
    return this.sharedFleetService.rechargeWallet({
      ...input,
      operatorId: this.context.req.user.id,
    });
  }
}
