import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { isNumber, IsNumber } from 'class-validator';

export class WorkshopQueryDTO {
  @ApiProperty()
  @IsNumber()
  @Transform((x: any) => {
    return isNumber(x.value) ? x.value : Number(x.value);
  })
  event_id: number;
}
