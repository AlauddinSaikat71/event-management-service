import { ApiResponseProperty } from '@nestjs/swagger';
class PaginationDto {
  constructor(
    current_page: number,
    per_page: number,
    total: number,
    total_pages: number,
  ) {
    this.current_page = current_page;
    this.per_page = per_page;
    this.total = total;
    this.total_pages = total_pages;
  }

  @ApiResponseProperty()
  public total: number;

  @ApiResponseProperty()
  public per_page: number;

  @ApiResponseProperty()
  public total_pages: number;

  @ApiResponseProperty()
  public current_page: number;
}

export default PaginationDto;
