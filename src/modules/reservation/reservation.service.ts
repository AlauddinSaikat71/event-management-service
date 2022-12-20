import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumber } from 'class-validator';
import EventEntity from 'src/model/event.entity';
import ReservationEntity from 'src/model/reservation.entity';
import WorkshopEntity from 'src/model/workshop.entity';
import { Repository } from 'typeorm';
import { WorkshopService } from '../workshop/workshop.service';
import { EventService } from './../event/event.service';
import CreateReservationDTO from './dtos/create-reservation.dto';
import { WorkshopReservationResponseDTO } from './dtos/workshop-reservation-response.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepo: Repository<ReservationEntity>,
    @Inject(forwardRef(() => WorkshopService))
    private readonly workshopService: WorkshopService,
    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService,
  ) {}

  public async countByWorkshopId(workshopId: number | string): Promise<number> {
    workshopId = isNumber(workshopId) ? workshopId : Number(workshopId);
    return await this.reservationRepo.count({
      where: { workshop_id: workshopId },
    });
  }

  private async createOne(
    workshopId: number | string,
    dto: CreateReservationDTO,
  ) {
    workshopId = isNumber(workshopId) ? workshopId : Number(workshopId);

    const reservation: ReservationEntity = new ReservationEntity();
    reservation.name = dto.name;
    reservation.email = dto.email;
    reservation.workshop_id = workshopId;

    return this.reservationRepo.save(reservation);
  }

  public async workshopReservation(
    workshopId: number,
    dto: CreateReservationDTO,
  ) {
    const workshop: WorkshopEntity =
      await this.workshopService.findWorkshopById(workshopId);

    if (!workshop)
      throw new NotFoundException(
        `Workshop doesn't exist in database by workshopId = ${workshopId}`,
      );

    const reservation: ReservationEntity = await this.createOne(
      workshopId,
      dto,
    );

    const event: EventEntity = await this.eventService.findOneByEventId(
      workshop.event_id,
    );

    const result: WorkshopReservationResponseDTO =
      new WorkshopReservationResponseDTO(reservation, event, workshop);
    return result;
  }
}
