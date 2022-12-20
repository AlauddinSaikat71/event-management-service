import { ApiResponseProperty } from '@nestjs/swagger';
import ReservationEntity from 'src/model/reservation.entity';

export class ReservationDTO {
  constructor(r: ReservationEntity) {
    this.id = r.id;
    this.name = r.name;
    this.email = r.email;
  }

  public static fromEntity(r: ReservationEntity) {
    return new ReservationDTO(r);
  }

  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  email: string;
}
