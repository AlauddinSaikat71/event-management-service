import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import WorkshopEntity from 'src/model/workshop.entity';
import { EventModule } from '../event/event.module';
import { ReservationModule } from './../reservation/reservation.module';
import { WorkshopController } from './workshop.controller';
import { WorkshopService } from './workshop.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkshopEntity]),
    forwardRef(() => EventModule),
    ReservationModule,
  ],
  controllers: [WorkshopController],
  providers: [WorkshopService],
  exports: [WorkshopService],
})
export class WorkshopModule {}
