import { ApiProperty } from '@nestjs/swagger';
class EventDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public start_at: Date;
  @ApiProperty()
  public end_at: Date;
}

export default EventDto;
