import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

import { passwordValidate } from '@helpers/passwordValidate';

export class UserBodyCreate {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsNotEmpty()
  @Matches(passwordValidate.password)
  password: string;
}
