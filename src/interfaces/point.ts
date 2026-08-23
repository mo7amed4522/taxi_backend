import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('PointInput')
export class Point {
  type: 'Point' = 'Point';

  @Field(() => [Float])
  coordinates!: [number, number];

  get lat(): number {
    return this.coordinates[1];
  }

  get lng(): number {
    return this.coordinates[0];
  }

  constructor(lng: number, lat: number) {
    this.coordinates = [lng, lat];
  }
}
