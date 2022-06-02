import { IsNotEmpty } from 'class-validator';

export class RefreshTokenReqDto {
  @IsNotEmpty()
  refreshToken: string;
}
