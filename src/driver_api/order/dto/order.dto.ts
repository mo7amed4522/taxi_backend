import {
  Authorize,
  FilterableField,
  IDField,
  Relation,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { UserContext } from '../../auth/authenticated-user';
import { RiderDTO } from './rider.dto';
import { ServiceDTO } from '../../service/dto/service.dto';
import { OrderMessageDTO } from '../../chat/dto/order-message.dto';
import { DriverDTO } from '../../driver/dto/driver.dto';
import { ServiceOptionDTO } from './service-option.dto';
import { OrderStatus } from 'src/entities/enums/order-status.enum';
import { Point } from 'src/interfaces/point';
import { Filter } from '@nestjs-query/core';

@ObjectType('DriverOrder')
@Authorize({
  authorize: (context: UserContext) =>
    ({ driverId: { eq: context.req.user.id } }) as Filter<OrderDTO>,
})
@Relation('driver', () => DriverDTO, {
  disableRemove: true,
  disableUpdate: true,
})
@Relation('rider', () => RiderDTO, { disableRemove: true, disableUpdate: true })
@Relation('service', () => ServiceDTO, {
  disableRemove: true,
  disableUpdate: true,
})
@UnPagedRelation('options', () => ServiceOptionDTO, {
  disableRemove: true,
  disableUpdate: true,
})
@UnPagedRelation('conversation', () => OrderMessageDTO, {
  relationName: 'conversation',
  disableRemove: true,
  disableUpdate: true,
})
export class OrderDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField(() => OrderStatus)
  status: OrderStatus;
  @FilterableField()
  createdOn: Date;
  @FilterableField(() => Int)
  distanceBest!: number;
  @Field(() => Int)
  durationBest!: number;
  startTimestamp?: Date;
  finishTimestamp?: Date;
  etaPickup?: Date;
  waitMinutes!: number;
  expectedTimestamp: Date;
  @FilterableField()
  costBest: number;
  costAfterCoupon: number;
  providerShare: number;
  paidAmount: number;
  currency!: string;
  @FilterableField(() => ID, { filterOnly: true })
  driverId?: number;
  addresses: string[];
  points: Point[];
  tipAmount!: number;
  paymentGatewayId?: number;
  directions?: Point[];
}
