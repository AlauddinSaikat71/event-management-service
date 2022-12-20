import {
  EMSRequestLogInterceptor,
  SwaggerResponseType,
  TransformInterceptor,
} from '@app/common';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import ActiveWorkShopsResponseDTO from './dtos/active-wrokshops-response.dto';
import { WorkshopInfoDTO } from './dtos/workshop-info.dto';
import { WorkshopQueryDTO } from './dtos/workshop-query.dto';
import { WorkshopService } from './workshop.service';

@Controller('workshop')
@ApiTags('Workshop APIs')
@UseInterceptors(TransformInterceptor, EMSRequestLogInterceptor)
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SwaggerResponseType(ActiveWorkShopsResponseDTO) })
  @Get('all/active')
  @ApiQuery({ type: WorkshopQueryDTO })
  public async getActiveWorkshopsByEventId(
    @Query() query: WorkshopQueryDTO,
  ): Promise<ActiveWorkShopsResponseDTO> {
    const result = await this.workshopService.getActiveWorkshopsByEventId(
      query.event_id,
    );
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SwaggerResponseType(WorkshopInfoDTO) })
  @Get('/:id')
  public async getSingleWorkshopInfo(
    @Param('id') id: number,
  ): Promise<WorkshopInfoDTO> {
    const result = await this.workshopService.getSingleWorkshopInfo(id);
    return result;
  }
}
