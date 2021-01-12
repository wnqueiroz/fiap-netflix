import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaUsersEntity } from './media-users.entity';
import { MediaEntity } from './media.entity';

import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  imports: [TypeOrmModule.forFeature([MediaEntity, MediaUsersEntity])],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
