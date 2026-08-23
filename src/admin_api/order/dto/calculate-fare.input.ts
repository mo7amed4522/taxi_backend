import { InputType } from '@nestjs/graphql';
import { Point } from 'src/interfaces/point';

@InputType()
export class CalculateFareInput {
  points!: Point[];
}
