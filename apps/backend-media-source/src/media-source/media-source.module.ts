import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaSourceController } from './media-source.controller';
import { MediaSourceService } from './media-source.service';

import { MediaSourceEntity } from './media-source.entity';
import { MediaSourceUsersEntity } from './media-source-users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaSourceEntity, MediaSourceUsersEntity]),
  ],
  controllers: [MediaSourceController],
  providers: [MediaSourceService],
})
export class MediaSourceModule {}
