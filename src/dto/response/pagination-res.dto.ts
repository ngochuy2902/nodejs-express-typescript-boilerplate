import { Expose } from 'class-transformer';

export class PaginationResDto {
  @Expose()
  page: number;

  @Expose()
  pageSize: number;

  @Expose()
  totalRecords: number;

  @Expose()
  totalPage: number;

  @Expose()
  records: Array<any>;
}
