import { Field, ID, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum TopUpWalletStatus {
  OK = 'OK',
  Redirect = 'Redirect'
}
registerEnumType(TopUpWalletStatus, { name: 'TopUpWalletStatus' });

@InputType()
export class TopUpWalletInput {
  @Field(() => ID)
  gatewayId: string;
  @Field(() => ID)
  amount: number;
  @Field(() => ID)
  currency: string;
  @Field({ nullable: true })
  token?: string;
  @Field({ nullable: true })
  pin?: string;
  @Field({ nullable: true })
  otp?: string;
  @Field({ nullable: true })
  transactionId?: string;
}

@ObjectType()
export class TopUpWalletResponse {
  @Field(() => TopUpWalletStatus)
  status: TopUpWalletStatus;
  @Field()
  url: string;
}