import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const logger = new Logger('NestApplication');

  const configService = app.get(ConfigService);

  const { port } = configService.get('app');

  await app.listen(port, () =>
    logger.log(`Server is listening on port: ${port}`),
  );
}

bootstrap();
