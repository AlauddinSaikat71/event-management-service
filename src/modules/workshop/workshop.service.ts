import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import EventEntity from 'src/model/event.entity';
import WorkshopEntity from 'src/model/workshop.entity';
import { MoreThan, Repository } from 'typeorm';
import { EventService } from '../event/event.service';
import ActiveWorkShopsResponseDTO from './dtos/active-wrokshops-response.dto';

@Injectable()
export class WorkshopService {
  constructor(
    @InjectRepository(WorkshopEntity)
    private readonly workshopRepo: Repository<WorkshopEntity>,
    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService,
  ) {}

  public async countWorkshopByEventId(eventId: number) {
    const count: number = await this.workshopRepo.count({
      where: { event_id: eventId },
    });
    return count;
  }

  public async findActiveWorkshopsByEventId(
    eventId: number,
  ): Promise<WorkshopEntity[]> {
    const now = new Date();
    return await this.workshopRepo.find({
      where: { event_id: eventId, start_at: MoreThan(now) },
    });
  }

  public async getActiveWorkshopsByEventId(
    eventId: number,
  ): Promise<ActiveWorkShopsResponseDTO> {
    try {
      const event: EventEntity = await this.eventService.findOneByEventId(
        eventId,
      );

      const workshops: WorkshopEntity[] =
        await this.findActiveWorkshopsByEventId(eventId);

      const result: ActiveWorkShopsResponseDTO = new ActiveWorkShopsResponseDTO(
        event,
        workshops,
      );
      return result;
    } catch (error) {
      console.log(
        `Exception occurered while executing getActiveWorkshopsByEventId for eventId: ${eventId}`,
      );
      return null;
    }
  }
}
