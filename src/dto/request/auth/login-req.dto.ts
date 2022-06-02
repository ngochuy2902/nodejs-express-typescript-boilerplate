import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginReqDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
