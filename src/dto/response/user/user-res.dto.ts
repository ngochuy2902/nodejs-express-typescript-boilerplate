import { Expose } from 'class-transformer';

export class UserResDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  role: string;

  @Expose()
  activated: boolean;
}
