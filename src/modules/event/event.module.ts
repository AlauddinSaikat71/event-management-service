import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EventEntity from '../../model/event.entity';
import { WorkshopModule } from './../workshop/workshop.module';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity]),
    forwardRef(() => WorkshopModule),
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
