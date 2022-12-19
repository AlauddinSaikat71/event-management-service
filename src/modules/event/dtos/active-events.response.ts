import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import EventEntity from '../../../model/event.entity';
import EventDto from './event.dto';
import PaginationDto from './pagination.dto';

class ActiveEventsResponse {
  constructor(events: EventEntity[], pagination: PaginationDto) {
    this.events = events.map((e) => {
      return new EventDto(e);
    });
    this.pagination = pagination;
  }

  @ApiProperty({ type: EventDto, isArray: true })
  public events: EventDto[];

  @ApiResponseProperty()
  public pagination: PaginationDto;
}

export default ActiveEventsResponse;
