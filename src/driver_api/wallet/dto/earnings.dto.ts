import { ObjectType, registerEnumType, Field } from '@nestjs/graphql';

export enum TimeQuery {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
}

registerEnumType(TimeQuery, { name: 'TimeQuery' });

@ObjectType()
export class StatisticsResult {
  @Field()
  currency: string;

  @Field(() => [Datapoint])
  dataset: Datapoint[];
}

@ObjectType()
export class Datapoint {
  @Field()
  name: string;

  @Field()
  current: string;

  @Field()
  earning: number;

  @Field()
  count: number;

  @Field()
  distance: number;

  @Field()
  time: number;
}
