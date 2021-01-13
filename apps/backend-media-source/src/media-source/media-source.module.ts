import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaSourceController } from './media-source.controller';
import { MediaSourceService } from './media-source.service';

import { MediaSourceEntity } from './media-source.entity';
import { MediaSourceUsersEntity } from './media-source-users.entity';
import { ClientOptions, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaSourceEntity, MediaSourceUsersEntity]),
    ClientsModule.registerAsync([
      {
        name: 'MEDIA_SOURCE_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService): ClientOptions => {
          const { kafka } = configService.get('app');

          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'media-source',
                brokers: [`${kafka.host}:${kafka.port}`],
              },
              consumer: {
                groupId: 'media-source-consumer',
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [MediaSourceController],
  providers: [MediaSourceService],
})
export class MediaSourceModule {}
