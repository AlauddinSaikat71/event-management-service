import { EMSRequestLogInterceptor, TransformInterceptor } from '@app/common';
import { Controller } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { WorkshopService } from './workshop.service';

@Controller('workshop')
@ApiTags('Workshop APIs')
@UseInterceptors(TransformInterceptor, EMSRequestLogInterceptor)
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}
}
