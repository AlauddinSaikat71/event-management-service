import { EMSRequestLogInterceptor, TransformInterceptor } from '@app/common';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import CreateReservationDTO from './dtos/create-reservation.dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
@ApiTags('Reservation APIs')
@UseInterceptors(TransformInterceptor, EMSRequestLogInterceptor)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('workshop-id/:workshopId')
  public async workshopReservation(
    @Param('workshopId') workshopId: number,
    @Body() body: CreateReservationDTO,
  ) {
    const result = await this.reservationService.workshopReservation(
      workshopId,
      body,
    );
    return result;
  }
}
