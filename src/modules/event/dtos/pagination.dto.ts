import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
class PaginationDto {
  @IsNumber()
  @ApiProperty({ type: Number })
  public total: number;

  @IsNumber()
  @ApiProperty({ type: Number })
  public per_page: number;

  @IsNumber()
  @ApiProperty({ type: Number })
  public total_pages: number;

  @IsNumber()
  @ApiProperty({ type: Number })
  public current_page: number;
}

export default PaginationDto;
