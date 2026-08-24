import {
  BeforeUpdateOne,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';
import { InputType } from '@nestjs/graphql';

import { UserContext } from '../../auth/authenticated-user';
import { Gender } from './../../../entities/enums/gender.enum';
import { RiderDocumentType } from './../../../entities/enums/rider-document-type';

@InputType()
@BeforeUpdateOne(
  (input: UpdateOneInputType<UpdateRiderInput>, context: UserContext) => {
    input.id = context.req.user.id;
    return input;
  },
)
export class UpdateRiderInput {
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  email?: string;
  notificationPlayerId?: string;
  isResident?: boolean;
  idNumber?: string;
  documentType?: RiderDocumentType;
}
