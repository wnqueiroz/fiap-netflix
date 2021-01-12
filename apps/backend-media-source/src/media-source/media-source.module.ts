import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaSourceController } from './media-source.controller';
import { MediaSourceEntity } from './media-source.entity';
import { MediaSourceService } from './media-source.service';

@Module({
  imports: [TypeOrmModule.forFeature([MediaSourceEntity])],
  controllers: [MediaSourceController],
  providers: [MediaSourceService],
})
export class MediaSourceModule {}
