import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ReservationEntity from 'src/model/reservation.entity';
import { WorkshopModule } from '../workshop/workshop.module';
import { EventModule } from './../event/event.module';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationEntity]),
    forwardRef(() => WorkshopModule),
    forwardRef(() => EventModule),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
