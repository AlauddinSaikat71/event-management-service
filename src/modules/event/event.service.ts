import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isDate, isNumber } from 'class-validator';
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

  public async countActiveEvents(now: Date | string) {
    now = isDate(now) ? now : new Date(now);
    return await this.eventRepo.count({
      where: { start_at: MoreThan(now) },
    });
  }

  public async findPaginatedActiveEvents(
    currentPage: number | string,
    perPage: number | string,
    now: Date | string,
  ) {
    currentPage = isNumber(currentPage) ? currentPage : Number(currentPage);
    perPage = isNumber(perPage) ? perPage : Number(perPage);
    now = isDate(now) ? now : new Date(now);

    return await this.eventRepo.find({
      where: {
        start_at: MoreThan(now),
      },
      skip: (currentPage - 1) * perPage,
      take: perPage,
    });
  }

  public async getAllActiveEvent(currentPage: number, perPage: number) {
    const now = new Date();

    const activeEventsCount: number = await this.countActiveEvents(now);

    const activeEvents: EventEntity[] = await this.findPaginatedActiveEvents(
      currentPage,
      perPage,
      now,
    );

    const paginationDto: PaginationDto = new PaginationDto(
      currentPage,
      perPage,
      activeEventsCount,
      Math.ceil(activeEventsCount / perPage),
    );

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
