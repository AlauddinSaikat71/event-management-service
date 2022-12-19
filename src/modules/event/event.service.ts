import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import EventEntity from '../../model/event.entity';
import { WorkshopService } from './../workshop/workshop.service';
import ActiveEventsResponse from './dtos/active-events.response';
import EventInfoDTO from './dtos/event-info.dto';
import PaginationDto from './dtos/pagination.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,
    private readonly workshopService: WorkshopService,
  ) {}

  public async getAllActiveEvent(current_page: number, per_page: number) {
    try {
      const now = new Date();
      const activeEventsCount: number = await this.eventRepo.count({
        where: { start_at: MoreThan(now) },
      });

      const activeEvents: EventEntity[] = await this.eventRepo.find({
        where: {
          start_at: MoreThan(now),
        },
        skip: (current_page - 1) * per_page,
        take: per_page,
      });

      const paginationDto: PaginationDto = {
        current_page: current_page,
        per_page: per_page,
        total: activeEventsCount,
        total_pages: Math.ceil(activeEventsCount / per_page),
      };

      const response: ActiveEventsResponse = new ActiveEventsResponse(
        activeEvents,
        paginationDto,
      );
      return response;
    } catch (err) {
      console.log(
        `Exception occurered while executing getAllActiveEvent for current_page: ${current_page}, per_page: ${per_page}`,
      );
      return null;
    }
  }

  public async getSingleEventInfo(eventId: number) {
    try {
      const event: EventEntity = await this.eventRepo.findOne({
        where: { id: eventId },
      });

      const totalWorkshops: number =
        await this.workshopService.countWorkshopByEventId(eventId);

      const response: EventInfoDTO = new EventInfoDTO(event, totalWorkshops);
      return response;
    } catch (error) {
      console.log(
        `Exception occurered while executing getSingleEventInfo for eventId: ${eventId}`,
      );
      return null;
    }
  }
}
