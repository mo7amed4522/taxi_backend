import { FilterableField, IDField, Relation } from "@nestjs-query/query-graphql";
import { ID, ObjectType } from "@nestjs/graphql";
import { OperatorDTO } from "../../operator/dto/operator.dto";
import { TransactionAction } from "src/entities/enums/transaction-action.enum";
import { ProviderDeductTransactionType } from "src/entities/enums/provider-deduct-transaction-type.enum";
import { ProviderRechargeTransactionType } from "src/entities/enums/provider-recharge-transaction-type.enum";

@ObjectType('FleetTransaction')
@Relation('operator', () => OperatorDTO, { nullable: true })
export class FleetTransactionDTO {
    @IDField(() => ID)
    id: number;
    transactionTimestamp!: Date;
    action: TransactionAction;
    deductType?: ProviderDeductTransactionType;
    rechargeType?: ProviderRechargeTransactionType;
    amount: number;
    currency: string;
    refrenceNumber?: string;
    description?: string;
    @FilterableField(() => ID)
    operatorId?: number;
    @FilterableField(() => ID)
    requestId?: number;
    @FilterableField(() => ID)
    fleetId: number;
}