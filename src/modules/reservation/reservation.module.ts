import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ReservationEntity from 'src/model/reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity])],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
