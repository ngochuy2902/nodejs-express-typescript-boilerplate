import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../../../enum/role.enum';

export class UserCreateReqDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(Role, { each: true })
  role: string;
}
