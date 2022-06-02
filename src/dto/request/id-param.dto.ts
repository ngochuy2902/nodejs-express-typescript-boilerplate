import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class IdParamDto {
  @IsInt()
  @Transform(({ value }) => Number(value))
  id!: number;
}
