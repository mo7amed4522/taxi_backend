import { IDField } from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { RewardAppType } from './../../../entities/enums/reward-app-type';
import { RewardBeneficiary } from './../../../entities/enums/reward-beneficiary';
import { RewardEvent } from './../../../entities/enums/reward-event';

@ObjectType('Reward')
export class RewardDTO {
  @IDField(() => ID)
  id!: number;
  title!: string;
  startDate?: Date;
  endDate?: Date;
  appType!: RewardAppType;
  beneficiary!: RewardBeneficiary;
  event!: RewardEvent;
  creditGift!: number;
  tripFeePercentGift?: number;
  creditCurrency?: string;
  conditionTripCountsLessThan?: number;
  conditionUserNumberFirstDigits?: string[];
}
