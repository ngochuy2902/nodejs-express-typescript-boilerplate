import { PaginationReqDto } from '../pagination-req.dto';
import { IsOptional, IsString } from 'class-validator';

export class UserFetchReqDto extends PaginationReqDto {
  @IsString()
  @IsOptional()
  keyword: string;
}
