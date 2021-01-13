import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const { port, kafka } = configService.get('app');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const logger = new Logger('NestApplication');

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'catalog',
        brokers: [`${kafka.host}:${kafka.port}`],
      },
      consumer: {
        groupId: 'catalog-consumer',
      },
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(port, () =>
    logger.log(`Server is listening on port: ${port}`),
  );
}

bootstrap();
