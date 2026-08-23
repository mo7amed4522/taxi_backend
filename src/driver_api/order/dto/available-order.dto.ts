import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from 'src/entities/enums/order-status.enum';
import { Point } from '../../../index';

@ObjectType('AvailableOrder')
export class AvailableOrderDTO {
  id: number;
  createdOn: Date;
  startTimestamp?: Date;
  finishTimestamp?: Date;
  etaPickup?: Date;
  status: OrderStatus;
  expectedTimestamp: Date;
  costBest: number;
  @Field(() => Int)
  distanceBest: number;
  @Field(() => Int)
  durationBest: number;
  currency!: string;
  driverId?: number;
  addresses: string[];
  points: Point[];
}
