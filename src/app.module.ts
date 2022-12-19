import { EMSValidationPipe, HttpExceptionFilter } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    EventEmitterModule.forRoot({
      global: true,
    }),
    EventModule,
  ],
  providers: [
    { provide: APP_PIPE, useClass: EMSValidationPipe },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
