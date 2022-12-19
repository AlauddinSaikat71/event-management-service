import { EMSRequestLogInterceptor, TransformInterceptor } from '@app/common';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SwaggerResponseType } from './../../../libs/common/src/types/swagger-response.type';
import { ActiveEventQuery } from './dtos/active-events.query';
import ActiveEventsResponse from './dtos/active-events.response';
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
    @Res() response: Response,
  ) {
    console.log(query);

    const result = await this.eventService.getAllActiveEvent(
      query.current_page,
      query.per_page,
    );

    if (result) {
      response.status(HttpStatus.OK);
      return response.json(result);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return response.json({ error: 'Internal server error' });
    }
  }
}
