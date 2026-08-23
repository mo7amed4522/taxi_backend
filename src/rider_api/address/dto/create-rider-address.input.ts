import {
  BeforeCreateOne,
  CreateOneInputType,
} from '@nestjs-query/query-graphql';
import { InputType } from '@nestjs/graphql';
import { UserContext } from '../../auth/authenticated-user';
import { Point } from '../../../index';
import { RiderAddressType } from 'src/entities/enums/rider-address-type.enum';

@InputType()
@BeforeCreateOne(
  (
    input: CreateOneInputType<CreateRiderAddressInput>,
    context: UserContext,
  ) => {
    return { input: { ...input.input, riderId: context.req.user.id } };
  },
)
export class CreateRiderAddressInput {
  title: string;
  details: string;
  location: Point;
  type?: RiderAddressType;
}
