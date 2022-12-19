import { ApiResponseProperty } from '@nestjs/swagger';
import EventEntity from 'src/model/event.entity';
import EventDto from './event.dto';

class EventInfoDTO extends EventDto {
  constructor(event: EventEntity, totalWorkshops: number) {
    super(event);
    this.total_workshops = totalWorkshops;
  }
  @ApiResponseProperty()
  total_workshops: number;
}
export default EventInfoDTO;
