import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaUsersEntity } from './media-users.entity';
import { MediaEntity } from './media.entity';

import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaKeywordsEntity } from './media-keywords.entity';
import { KeywordEntity } from './keyword.entity';
import { GenreEntity } from './genre.entity';
import { MediaGenresEntity } from './media-genres.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MediaEntity,
      GenreEntity,
      KeywordEntity,
      MediaUsersEntity,
      MediaGenresEntity,
      MediaKeywordsEntity,
    ]),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
