import { Authorize, IDField, Relation } from '@nestjs-query/query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { MediaDTO } from '../../upload/media.dto';
import { GatewayAuthorizer } from './gateway.authorizer';
import { PaymentGatewayType } from './../../../entities/enums/payment-gateway-type.enum';

@ObjectType('AdminPaymentGateway')
@Authorize(GatewayAuthorizer)
@Relation('media', () => MediaDTO, { nullable: true })
export class PaymentGatewayDTO {
  @IDField(() => ID)
  id!: number;
  @Field()
  enabled!: boolean;
  @Field()
  title!: string;
  @Field()
  type!: PaymentGatewayType;
  @Field()
  publicKey?: string;
  @Field()
  privateKey?: string;
  merchantId?: string;
  saltKey?: string;
  mediaId?: number;
}
