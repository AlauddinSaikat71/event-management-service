import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { isNumber, IsNumber } from 'class-validator';

export class ActiveEventQuery {
  @ApiProperty()
  @IsNumber()
  @Transform((x: any) => {
    return isNumber(x.value) ? x.value : Number(x.value);
  })
  current_page: number;

  @ApiProperty()
  @IsNumber()
  @Transform((x: any) => {
    return isNumber(x.value) ? x.value : Number(x.value);
  })
  per_page: number;
}
