import { IsNotEmpty } from 'class-validator';

export class ChangePasswordReqDto {
  @IsNotEmpty()
  currentPassword: string;

  @IsNotEmpty()
  newPassword: string;
}
