import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory(errors) {
        const response = {
          message:
            'The provided values are invalid, please retry with valid values.',
        };
        errors.forEach((error) => {
          response[error.property] = 'Invalid value';
          try {
            if (error.constraints) {
              response[error.property] = Object.values(error.constraints)[0];
            }
          } catch {}
        });
        throw new BadRequestException(response);
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
