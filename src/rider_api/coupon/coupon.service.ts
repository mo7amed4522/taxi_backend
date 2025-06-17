import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ForbiddenError } from "apollo-server-core";
import { Repository } from "typeorm";
import { RiderWalletDTO } from "../wallet/dto/rider-wallet.dto";
import { CouponEntity } from "src/entities/coupon.entity";
import { GiftCardEntity } from "src/entities/gift-card.entity";
import { RiderRechargeTransactionType } from "src/entities/enums/rider-recharge-transaction-type.enum";
import { TransactionAction } from "src/entities/enums/transaction-action.enum";
import { TransactionStatus } from "src/entities/enums/transaction-status.enum";
import { SharedRiderService } from "src/order/shared-rider.service";

@Injectable()
export class CouponService {
    constructor(
        @InjectRepository(CouponEntity)
        private giftCardRepo: Repository<GiftCardEntity>,
        private sharedRiderService: SharedRiderService
    ) { }

    

    async redeemGiftCard(code: string, riderId: number): Promise<RiderWalletDTO> {
        const card = await this.giftCardRepo.findOne({ where: { code } });
        if (card == null) throw new ForbiddenError('Invalid code');
        await this.giftCardRepo.update(card.id, { isUsed: true });
        return this.sharedRiderService.rechargeWallet({
            riderId,
            action: TransactionAction.Recharge,
            rechargeType: RiderRechargeTransactionType.Gift,
            status: TransactionStatus.Done,
            currency: card.currency,
            amount: card.amount,
            giftCardId: card.id
        });
    }
}