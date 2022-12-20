import { ApiResponseProperty } from '@nestjs/swagger';
import EventEntity from 'src/model/event.entity';
class EventDto {
  constructor(event: EventEntity) {
    this.id = event.id;
    this.title = event.title;
    this.start_at = event.start_at;
    this.end_at = event.end_at;
  }

  public static fromEntity(event: EventEntity) {
    return new EventDto(event);
  }

  @ApiResponseProperty()
  public id: number;

  @ApiResponseProperty()
  public title: string;

  @ApiResponseProperty()
  public start_at: Date;

  @ApiResponseProperty()
  public end_at: Date;
}

export default EventDto;
