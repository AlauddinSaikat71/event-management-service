import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import EventEntity from 'src/model/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,
  ) {}
}
