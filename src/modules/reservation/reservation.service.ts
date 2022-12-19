import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ReservationEntity from 'src/model/reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly ReservationRepo: Repository<ReservationEntity>,
  ) {}
}
