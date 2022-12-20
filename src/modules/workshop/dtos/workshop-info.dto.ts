import { ApiResponseProperty } from '@nestjs/swagger';
import WorkshopEntity from 'src/model/workshop.entity';
import WorkshopDTO from './workshop.dto';

export class WorkshopInfoDTO extends WorkshopDTO {
  constructor(w: WorkshopEntity, totalReservations: number) {
    super(w);
    this.total_reservations = totalReservations;
  }
  @ApiResponseProperty()
  total_reservations: number;
}
