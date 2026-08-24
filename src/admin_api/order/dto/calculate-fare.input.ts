import { InputType } from '@nestjs/graphql';
import { Point } from './../../../interfaces/point';

@InputType()
export class CalculateFareInput {
  points!: Point[];
}
