import { Expose } from 'class-transformer';

export class UserLoginResDto {
  constructor(role: string, accessToken: string, refreshToken: string) {
    this.role = role;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  @Expose()
  role: string;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
