import { Inject, UseGuards } from "@nestjs/common";
import { Args, CONTEXT, ID, Mutation, Resolver } from "@nestjs/graphql";
import { ForbiddenError } from "apollo-server-core";
import { getRepository } from "typeorm";
import { UserContext } from "../auth/authenticated-admin";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RiderTransactionInput } from "./dto/rider-transaction.input";
import { RiderWalletDTO } from "./dto/rider-wallet.dto";
import { RiderDTO } from "./dto/rider.dto";
import { TransactionAction } from "src/entities/enums/transaction-action.enum";
import { TransactionStatus } from "src/entities/enums/transaction-status.enum";
import { OperatorEntity } from "src/entities/operator.entity";
import { OperatorPermission } from "src/entities/enums/operator-permission.enum";
import { SharedRiderService } from "src/order/shared-rider.service";

@Resolver()
@UseGuards(JwtAuthGuard)
export class RiderResolver {
    constructor(
        private sharedRiderService: SharedRiderService,
        @Inject(CONTEXT)
        private context: UserContext
    ) {}

    @Mutation(() => RiderWalletDTO)
    async createRiderTransaction(@Args('input', { type: () => RiderTransactionInput }) input: RiderTransactionInput) {
        input.amount = input.action == TransactionAction.Recharge ? Math.abs(input.amount) : Math.abs(input.amount) * -1;
        return this.sharedRiderService.rechargeWallet({...input, operatorId: this.context.req.user.id, status: TransactionStatus.Done});
    }

    @Mutation(() => RiderDTO)
    async deleteOneRider(@Args('id', { type: () => ID}) id: number): Promise<RiderDTO> {
        const operator = await getRepository(OperatorEntity).findOne({ where: { id: this.context.req.user.id }, relations: ['role'] });
        if(!operator || !operator.role || !operator.role.permissions.includes(OperatorPermission.Riders_Edit)) {
            throw new ForbiddenError('PERMISSION_NOT_GRANTED');
        }
        return this.sharedRiderService.deleteById(id);
    }
}