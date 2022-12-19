import {
  BadRequestException,
  Injectable,
  Optional,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Injectable()
export class EMSValidationPipe extends ValidationPipe {
  constructor(@Optional() options?: ValidationPipeOptions) {
    options = options || {};
    super({
      transform: true,
      whitelist: false,
      transformOptions: {
        exposeDefaultValues: true,
      },
      ...options,
      exceptionFactory: (errors) => this.buildError(errors),
    });
  }

  private buildError(errors: ValidationError[]) {
    const properties = errors.map((x) => x.property).toString();
    const message = `Required properties ${properties} missing or invalid`;
    return new BadRequestException(message);
  }
}
