import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaUsersEntity } from './media-users.entity';
import { MediaEntity } from './media.entity';

import { MediaController } from './media.controller';
import { MediaService } from './media.service';

// TODO: use module instead this
import { GenresModule } from '../genres/genres.module';

import { KeywordEntity } from './keyword.entity';
import { MediaGenresEntity } from './media-genres.entity';
import { MediaKeywordsEntity } from './media-keywords.entity';
import { MediaCategoriesEntity } from './media-categories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MediaEntity,
      KeywordEntity,
      MediaUsersEntity,
      MediaGenresEntity,
      MediaKeywordsEntity,
      MediaCategoriesEntity,
    ]),
    GenresModule,
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
