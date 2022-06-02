import { IsEnum, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { SortDirection } from '../../enum/sort.direction';
import { Transform } from 'class-transformer';

export class PaginationReqDto {
  constructor(data: Partial<PaginationReqDto>) {
    Object.assign(this, data);
  }

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page: number = 1;

  @IsInt()
  @IsOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  pageSize: number = 10;

  @IsOptional()
  @IsEnum(SortDirection, { each: true })
  sortType: SortDirection = SortDirection.ASC;

  @IsString()
  @IsOptional()
  sortField: string = 'id';

  toString() {
    return JSON.stringify(this);
  }
}
