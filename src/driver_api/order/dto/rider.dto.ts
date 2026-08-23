import { IDField, Relation } from '@nestjs-query/query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { MediaDTO } from '../../upload/media.dto';

@ObjectType('DriverRider')
@Relation('media', () => MediaDTO, {
  nullable: true,
  disableRemove: true,
  disableUpdate: true,
})
export class RiderDTO {
  @IDField(() => ID)
  id!: number;
  firstName?: string;
  lastName?: string;
  @Field()
  mobileNumber: string;
}
