import { EMSRequestLogInterceptor, TransformInterceptor } from '@app/common';
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { Param, UseInterceptors } from '@nestjs/common/decorators';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwaggerResponseType } from './../../../libs/common/src/types/swagger-response.type';
import { ActiveEventQuery } from './dtos/active-events.query';
import ActiveEventsResponse from './dtos/active-events.response';
import EventInfoDTO from './dtos/event-info.dto';
import { EventService } from './event.service';

@Controller('event')
@ApiTags('Event APIs')
@UseInterceptors(TransformInterceptor, EMSRequestLogInterceptor)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SwaggerResponseType(ActiveEventsResponse) })
  @Get('all/active')
  @ApiQuery({ type: ActiveEventQuery })
  public async getAllActiveEvent(
    @Query() query: ActiveEventQuery,
  ): Promise<ActiveEventsResponse> {
    const result: ActiveEventsResponse =
      await this.eventService.getAllActiveEvent(
        query.current_page,
        query.per_page,
      );
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SwaggerResponseType(EventInfoDTO) })
  @Get('/:id')
  public async getSingleEventInfo(
    @Param('id') id: number,
  ): Promise<EventInfoDTO> {
    const result = await this.eventService.getSingleEventInfo(id);
    return result;
  }
}
