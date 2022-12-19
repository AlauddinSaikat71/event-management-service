import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import WorkshopEntity from 'src/model/workshop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkshopService {
  constructor(
    @InjectRepository(WorkshopEntity)
    private readonly workshopRepo: Repository<WorkshopEntity>,
  ) {}

  public async countWorkshopByEventId(eventId: number) {
    const count: number = await this.workshopRepo.count({
      where: { event_id: eventId },
    });
    return count;
  }
}
