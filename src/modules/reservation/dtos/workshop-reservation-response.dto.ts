import { ApiProperty } from '@nestjs/swagger';
import EventEntity from 'src/model/event.entity';
import ReservationEntity from 'src/model/reservation.entity';
import WorkshopEntity from 'src/model/workshop.entity';
import EventDto from 'src/modules/event/dtos/event.dto';
import WorkshopDTO from 'src/modules/workshop/dtos/workshop.dto';
import { ReservationDTO } from './reservation.dto';

export class WorkshopReservationResponseDTO {
  constructor(r: ReservationEntity, e: EventEntity, w: WorkshopEntity) {
    this.reservation = ReservationDTO.fromEntity(r);
    this.event = EventDto.fromEntity(e);
    this.workshop = WorkshopDTO.fromEntity(w);
  }

  @ApiProperty({ type: ReservationDTO })
  reservation: ReservationDTO;

  @ApiProperty({ type: EventDto })
  event: EventDto;

  @ApiProperty({ type: WorkshopDTO })
  workshop: WorkshopDTO;
}
