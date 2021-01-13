import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';

import { MediaDto } from './dto/media.dto';

import { KeywordEntity } from './keyword.entity';
import { MediaCategoriesEntity } from './media-categories.entity';
import { MediaGenresEntity } from './media-genres.entity';
import { MediaKeywordsEntity } from './media-keywords.entity';
import { MediaUsersEntity } from './media-users.entity';
import { MediaEntity } from './media.entity';

import { GenresService } from '../genres/genres.service';

type GetAllFilters = {
  keyword?: string;
  idGenre?: string;
};

type SetMediaAsWatchedParams = {
  idUser: string;
  idMedia: string;
  remaining: MediaDto[];
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
    @InjectRepository(MediaCategoriesEntity)
    private mediaCategoriesEntity: Repository<MediaCategoriesEntity>,
    @InjectRepository(KeywordEntity)
    private keywordRepository: Repository<KeywordEntity>,
    private genresService: GenresService,
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
      const genre = await this.genresService.getOne(idGenre);

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

  async getMostWatched(): Promise<MediaDto[]> {
    const mediaUsersMostWatched = await this.mediaUsersRepository
      .createQueryBuilder('media_users')
      .select('media_users.idMedia', 'idMedia')
      .addSelect('COUNT(media_users.idMedia)', 'count')
      .where({
        isWatched: true,
      })
      .groupBy('media_users.idMedia')
      .orderBy('count', 'DESC')
      .take(10)
      .execute();

    if (!mediaUsersMostWatched.length) return [];

    const mediaIds = mediaUsersMostWatched.map(({ idMedia }) => idMedia);

    const categoriesAndMedia = await this.mediaCategoriesEntity
      .createQueryBuilder('media_categories')
      .innerJoinAndSelect('media_categories.media', 'media')
      .innerJoinAndSelect('media_categories.category', 'category')
      .where('media_categories.idMedia IN (:...ids)', { ids: mediaIds })
      .getMany();

    if (!categoriesAndMedia.length) return [];

    return categoriesAndMedia.reduce((acc, currentCategoryAndMedia) => {
      const { idCategory, category, media } = currentCategoryAndMedia;
      const foundIndex = acc.findIndex(category => category.id === idCategory);

      const notFoundCategory = foundIndex === -1;

      notFoundCategory
        ? acc.push({
            ...category,
            media: [media],
          })
        : acc[foundIndex].media.push(media);

      return acc;
    }, []);
  }

  async getWatchLaterList(idUser: string): Promise<MediaDto[]> {
    const watchLaterList = await this.mediaUsersRepository.find({
      where: {
        idUser,
        isWatchLater: true,
      },
      relations: ['media'],
    });

    return watchLaterList.map(({ media }) => new MediaDto(media));
  }

  async getWatched(idUser: string): Promise<MediaDto[]> {
    const mediaUsersWatched = await this.mediaUsersRepository
      .createQueryBuilder('media_users')
      .innerJoinAndSelect('media_users.media', 'media')
      .where('media_users.isWatched = :isWatched', { isWatched: true })
      .where('media_users.idUser = :idUser', { idUser })
      .getMany();

    const allMedia = mediaUsersWatched.map(({ media }) => media);

    return allMedia;
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

  async setMediaAsWatched(params: SetMediaAsWatchedParams): Promise<void> {
    const { idUser, idMedia, remaining } = params;

    if (!remaining.length) {
      const media = await this.getOne(idMedia);

      if (media) {
        const mediaUsers = await this.findOrCreateMediaUsers(idUser, idMedia);

        await this.mediaUsersRepository.save({
          ...mediaUsers,
          isWatched: true,
        });
      }
    }
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
