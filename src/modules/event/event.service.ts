import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumber } from 'class-validator';
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
    @Inject(forwardRef(() => WorkshopService))
    private readonly workshopService: WorkshopService,
  ) {}

  public async findOneByEventId(
    eventId: number | string,
  ): Promise<EventEntity> {
    eventId = isNumber(eventId) ? eventId : Number(eventId);
    return await this.eventRepo.findOne({ where: { id: eventId } });
  }

  public async getAllActiveEvent(current_page: number, per_page: number) {
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
  }

  public async getSingleEventInfo(eventId: number) {
    const event: EventEntity = await this.findOneByEventId(eventId);
    if (!event) {
      throw new NotFoundException(`Event not found by id = ${eventId}`);
    }

    const totalWorkshops: number =
      await this.workshopService.countWorkshopByEventId(eventId);

    const response: EventInfoDTO = new EventInfoDTO(event, totalWorkshops);
    return response;
  }
}
