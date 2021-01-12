import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';

import { MediaDto } from './dto/media.dto';
import { GenreEntity } from './genre.entity';

import { KeywordEntity } from './keyword.entity';
import { MediaGenresEntity } from './media-genres.entity';
import { MediaKeywordsEntity } from './media-keywords.entity';
import { MediaUsersEntity } from './media-users.entity';
import { MediaEntity } from './media.entity';

type GetAllFilters = {
  keyword?: string;
  idGenre?: string;
};

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
    @InjectRepository(MediaUsersEntity)
    private mediaUsersRepository: Repository<MediaUsersEntity>,
    @InjectRepository(MediaKeywordsEntity)
    private mediaKeywordsRepository: Repository<MediaKeywordsEntity>,
    @InjectRepository(MediaGenresEntity)
    private mediaGenresRepository: Repository<MediaGenresEntity>,
    @InjectRepository(KeywordEntity)
    private keywordRepository: Repository<KeywordEntity>,
    @InjectRepository(GenreEntity)
    private genreRepository: Repository<GenreEntity>,
  ) {}

  async getAll(filters: GetAllFilters): Promise<MediaDto[]> {
    const { keyword: keywordName, idGenre } = filters;

    if (keywordName) {
      const keyword = await this.keywordRepository.findOne({
        where: {
          name: Raw(alias => `${alias} ILIKE '%${keywordName}%'`),
        },
      });

      if (!keyword) throw new NotFoundException('Keyword not found');

      const mediaKeywords = await this.mediaKeywordsRepository.find({
        idKeyword: keyword.id,
      });

      if (!mediaKeywords.length) return [];

      const mediaIds = mediaKeywords.map(({ idMedia }) => idMedia);

      const allMedia = await this.mediaRepository.findByIds(mediaIds);

      return allMedia;
    }

    if (idGenre) {
      const genre = await this.genreRepository.findOne(idGenre);

      if (!genre) throw new NotFoundException('Genre not found');

      const mediaGenres = await this.mediaGenresRepository.find({
        idGenre,
      });

      if (!mediaGenres.length) return [];

      const mediaIds = mediaGenres.map(({ idMedia }) => idMedia);

      const allMedia = await this.mediaRepository.findByIds(mediaIds);

      return allMedia;
    }

    return this.mediaRepository.find();
  }

  async getOne(id: string): Promise<MediaDto> {
    const media = await this.mediaRepository.findOne({
      where: {
        id,
      },
    });

    if (!media) throw new NotFoundException('Media not found');

    return media;
  }

  async addToWatchLater(idUser: string, idMedia: string): Promise<MediaDto> {
    const media = await this.getOne(idMedia);

    const mediaUsers = await this.findOrCreateMediaUsers(idUser, idMedia);

    await this.mediaUsersRepository.save({ ...mediaUsers, isWatchLater: true });

    return media;
  }

  async likeOrUnlike(idUser: string, idMedia: string): Promise<MediaDto> {
    const media = await this.getOne(idMedia);

    const mediaUsers = await this.findOrCreateMediaUsers(idUser, idMedia);

    await this.mediaUsersRepository.save({
      ...mediaUsers,
      isLiked: !mediaUsers.isLiked,
    });

    return media;
  }

  private async findOrCreateMediaUsers(
    idUser: string,
    idMedia: string,
  ): Promise<MediaUsersEntity> {
    let mediaUsers = await this.mediaUsersRepository.findOne({
      where: {
        idMedia,
        idUser,
      },
    });

    if (!mediaUsers)
      mediaUsers = await this.mediaUsersRepository.save({
        idMedia,
        idUser,
      });

    return mediaUsers;
  }
}
