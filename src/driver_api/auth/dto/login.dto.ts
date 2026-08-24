import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Login')
export class LoginDTO {
  @Field()
  jwtToken!: string;
}
