import { ApiProperty } from '@nestjs/swagger';
import EventEntity from '../../../model/event.entity';
import EventDto from './event.dto';
import PaginationDto from './pagination.dto';

class ActiveEventsResponse {
  constructor(events: EventEntity[], pagination: PaginationDto) {
    this.events = events.map((e) => {
      return {
        id: e.id,
        title: e.title,
        start_at: e.start_at,
        end_at: e.end_at,
      };
    });
    this.pagination = pagination;
  }

  @ApiProperty({ type: EventDto, isArray: true })
  public events: EventDto[];

  @ApiProperty()
  public pagination: PaginationDto;
}

export default ActiveEventsResponse;
