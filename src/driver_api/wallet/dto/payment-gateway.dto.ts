import { Authorize, BeforeQueryMany, FilterableField, IDField, Relation } from '@nestjs-query/query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { UserContext } from '../../auth/authenticated-user';
import { MediaDTO } from '../../upload/media.dto';
import { PaymentGatewayType } from 'src/entities/enums/payment-gateway-type.enum';

@ObjectType('DriverPaymentGateway')
@Authorize({
    authorize: (context: UserContext) => ({enabled: { is: true }} as unknown as any)
})
@Relation('media', () => MediaDTO, { nullable: true, disableUpdate: true, disableRemove: true })
export class PaymentGatewayDTO {
    @IDField(() => ID)
    id: number;
    @Field()
    title: string;
    @Field()
    type: string;
    @Field()
    publicKey: string;
    @Field()
    privateKey: string;
    @Field()
    isEnabled: boolean;
}