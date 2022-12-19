import { ApiResponseProperty } from '@nestjs/swagger';
class PaginationDto {
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
