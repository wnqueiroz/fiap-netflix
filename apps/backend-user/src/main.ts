import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('NestApplication')

  const configService = app.get(ConfigService);

  const port = configService.get('PORT', 80);

  await app.listen(port, () => logger.log(`Server is listening on port: ${port}`));
}

bootstrap();
