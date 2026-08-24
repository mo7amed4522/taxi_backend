import { IDField, Relation } from '@nestjs-query/query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { MediaDTO } from '../../upload/media.dto';
import { ServicePaymentMethod } from './../../../entities/enums/service-payment-method.enum';

@ObjectType('DriverService')
@Relation('media', () => MediaDTO, { disableUpdate: true, disableRemove: true })
export class ServiceDTO {
  @IDField(() => ID)
  id: number;
  @Field()
  name: string;
  paymentMethod: ServicePaymentMethod;
  cancellationTotalFee!: number;
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  baseFare: number;
  @Field()
  perHundredMeters: number;
  @Field()
  perMinuteDrive: number;
  @Field()
  perMinuteWait: number;
  @Field()
  minimumFee: number;
  @Field()
  searchRadius: number;
  @Field()
  isEnabled: boolean;
}
