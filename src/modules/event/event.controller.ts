import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('event')
@ApiTags('event APIs')
export class EventController {}
