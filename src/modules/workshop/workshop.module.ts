import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import WorkshopEntity from 'src/model/workshop.entity';
import { WorkshopController } from './workshop.controller';
import { WorkshopService } from './workshop.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkshopEntity])],
  controllers: [WorkshopController],
  providers: [WorkshopService],
  exports: [WorkshopService],
})
export class WorkshopModule {}
