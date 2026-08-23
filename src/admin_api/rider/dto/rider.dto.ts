import {
  FilterableField,
  IDField,
  OffsetConnection,
  Relation,
} from '@nestjs-query/query-graphql';
import { ID, Int, ObjectType } from '@nestjs/graphql';
import { numberMasker } from '../../number.masker.middleware';
import { OrderDTO } from '../../order/dto/order.dto';
import { MediaDTO } from '../../upload/media.dto';
import { RiderAddressDTO } from './rider-address.dto';
import { RiderTransactionDTO } from './rider-transaction.dto';
import { RiderWalletDTO } from './rider-wallet.dto';
import { RiderStatus } from 'src/entities/enums/rider-status.enum';
import { Gender } from 'src/entities/enums/gender.enum';

@ObjectType('AdminRider')
@OffsetConnection('addresses', () => RiderAddressDTO)
@OffsetConnection('wallet', () => RiderWalletDTO)
@OffsetConnection('transactions', () => RiderTransactionDTO)
@OffsetConnection('orders', () => OrderDTO)
@Relation('media', () => MediaDTO, { nullable: true })
export class RiderDTO {
  @IDField(() => ID)
  id!: number;
  status: RiderStatus;
  @FilterableField()
  firstName?: string;
  @FilterableField()
  lastName?: string;
  @FilterableField(() => String, { middleware: [numberMasker] })
  mobileNumber: string;
  registrationTimestamp: Date;
  email?: string;
  @FilterableField()
  gender?: Gender;
  isResident?: boolean;
  idNumber?: string;
}
