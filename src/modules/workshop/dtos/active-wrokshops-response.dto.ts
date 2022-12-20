import { ApiProperty } from '@nestjs/swagger';
import EventEntity from 'src/model/event.entity';
import WorkshopEntity from 'src/model/workshop.entity';
import EventDto from 'src/modules/event/dtos/event.dto';
import WorkshopDTO from './workshop.dto';

class ActiveWorkShopsResponseDTO extends EventDto {
  constructor(event: EventEntity, workshops: WorkshopEntity[]) {
    super(event);
    this.workshops = workshops.map((w) => {
      return new WorkshopDTO(w);
    });
  }

  @ApiProperty({ type: WorkshopDTO, isArray: true })
  workshops: WorkshopDTO[];
}
export default ActiveWorkShopsResponseDTO;
