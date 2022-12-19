import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import EventEntity from '../../model/event.entity';
import ActiveEventsResponse from './dtos/active-events.response';
import PaginationDto from './dtos/pagination.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,
  ) {}

  public async getAllActiveEvent(current_page: number, per_page: number) {
    try {
      const now = new Date();
      const activeEventsCount = await this.eventRepo.count({
        where: { start_at: MoreThan(now) },
      });

      const activeEvents = await this.eventRepo.find({
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

      const response = new ActiveEventsResponse(activeEvents, paginationDto);
      return response;
    } catch (err) {
      console.log(
        `Exception occurered while executing getAllActiveEvent for current_page: ${current_page}, per_page: ${per_page}`,
      );
      return null;
    }
  }
}
