import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumber } from 'class-validator';
import EventEntity from 'src/model/event.entity';
import WorkshopEntity from 'src/model/workshop.entity';
import { MoreThan, Repository } from 'typeorm';
import { EventService } from '../event/event.service';
import { ReservationService } from './../reservation/reservation.service';
import ActiveWorkShopsResponseDTO from './dtos/active-wrokshops-response.dto';
import { WorkshopInfoDTO } from './dtos/workshop-info.dto';

@Injectable()
export class WorkshopService {
  constructor(
    @InjectRepository(WorkshopEntity)
    private readonly workshopRepo: Repository<WorkshopEntity>,
    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService,
    @Inject(forwardRef(() => ReservationService))
    private readonly reservationService: ReservationService,
  ) {}

  public async countWorkshopByEventId(eventId: number | string) {
    eventId = isNumber(eventId) ? eventId : Number(eventId);
    const count: number = await this.workshopRepo.count({
      where: { event_id: eventId },
    });
    return count;
  }

  public async findActiveWorkshopsByEventId(
    eventId: number | string,
  ): Promise<WorkshopEntity[]> {
    eventId = isNumber(eventId) ? eventId : Number(eventId);
    const now = new Date();
    return await this.workshopRepo.find({
      where: { event_id: eventId, start_at: MoreThan(now) },
    });
  }

  public async findWorkshopById(id: number | string): Promise<WorkshopEntity> {
    id = isNumber(id) ? id : Number(id);
    return await this.workshopRepo.findOne({
      where: { id: id },
    });
  }

  public async getActiveWorkshopsByEventId(
    eventId: number | string,
  ): Promise<ActiveWorkShopsResponseDTO> {
    const event: EventEntity = await this.eventService.findOneByEventId(
      eventId,
    );
    if (!event) {
      throw new NotFoundException(`Event not found by id = ${eventId}`);
    }

    const workshops: WorkshopEntity[] = await this.findActiveWorkshopsByEventId(
      eventId,
    );

    const result: ActiveWorkShopsResponseDTO = new ActiveWorkShopsResponseDTO(
      event,
      workshops,
    );
    return result;
  }

  public async getSingleWorkshopInfo(
    id: number | string,
  ): Promise<WorkshopInfoDTO> {
    const workshop: WorkshopEntity = await this.findWorkshopById(id);
    if (!workshop) {
      throw new NotFoundException(`Workshop not found by id = ${id}`);
    }

    const totalReservations: number =
      await this.reservationService.countByWorkshopId(id);

    const result = new WorkshopInfoDTO(workshop, totalReservations);
    return result;
  }
}
