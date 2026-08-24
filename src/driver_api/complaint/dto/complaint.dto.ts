import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IDField } from '@nestjs-query/query-graphql';
import { ComplaintStatus } from './../../../entities/enums/complaint-status.enum';

@ObjectType('DriverComplaint')
export class ComplaintDTO {
  @IDField(() => ID)
  id: number;
  @Field()
  subject: string;
  @Field()
  description: string;
  @Field()
  status: string;
}
