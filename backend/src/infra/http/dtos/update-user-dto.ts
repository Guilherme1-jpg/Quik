import { IsEmail, Length, Matches, IsOptional } from 'class-validator';

import { passwordValidate } from '@helpers/passwordValidate';

export class UserBodyUpdate {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Length(1, 100)
  name: string;

  @IsOptional()
  @Matches(passwordValidate.password)
  password: string;
}
