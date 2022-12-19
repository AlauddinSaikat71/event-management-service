import { EMSRequestLogInterceptor, TransformInterceptor } from '@app/common';
import { Controller } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';

@Controller('reservation')
@ApiTags('Reservation APIs')
@UseInterceptors(TransformInterceptor, EMSRequestLogInterceptor)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
}
