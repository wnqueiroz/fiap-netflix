import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MediaSourceDto } from './dto/media-source.dto';

import { MediaSourceUsersEntity } from './media-source-users.entity';
import { MediaSourceEntity } from './media-source.entity';

@Injectable()
export class MediaSourceService {
  constructor(
    @InjectRepository(MediaSourceEntity)
    private mediaSourceRepository: Repository<MediaSourceEntity>,
    @InjectRepository(MediaSourceUsersEntity)
    private mediaSourceUsersRepository: Repository<MediaSourceUsersEntity>,
  ) {}

  async getAll(idMedia: string): Promise<any> {
    const allMediaSource = await this.mediaSourceRepository.find({
      order: {
        order: 'ASC',
      },
      where: {
        idMedia,
      },
      relations: ['mediaSourceGroup'],
    });

    return allMediaSource.reduce((acc, currentMediaSource) => {
      const {
        idMediaSourceGroup,
        mediaSourceGroup,
        ...mediaSource
      } = currentMediaSource;

      const foundIndex = acc.findIndex(
        mediaSourceGroup => mediaSourceGroup.id === idMediaSourceGroup,
      );

      const notFoundMediaSourceGroup = foundIndex === -1;

      delete mediaSource.idMedia;

      notFoundMediaSourceGroup
        ? acc.push({
            ...mediaSourceGroup,
            mediaSource: [mediaSource],
          })
        : acc[foundIndex].mediaSource.push(mediaSource);

      return acc;
    }, []);
  }

  async getOne(idMediaSource: string): Promise<MediaSourceDto> {
    const mediaSource = await this.mediaSourceRepository.findOne({
      where: {
        id: idMediaSource,
      },
    });

    if (!mediaSource) throw new NotFoundException('Media source not found');

    return mediaSource;
  }

  async setAsWatched(
    idUser: string,
    idMediaSource: string,
  ): Promise<MediaSourceDto> {
    const mediaSource = await this.getOne(idMediaSource);

    const mediaSourceUsers = await this.findOrCreateMediaSourceUsers(
      idUser,
      idMediaSource,
    );

    await this.mediaSourceUsersRepository.save({
      ...mediaSourceUsers,
      isWatched: true,
    });

    return mediaSource;
  }

  async getRemainingUnwatched(
    idUser: string,
    mediaSource: MediaSourceDto,
  ): Promise<any> {
    const { idMediaSourceGroup, idMedia } = mediaSource;

    const [mediaSourceWatchedByUser, mediaSourceOnGroup] = await Promise.all([
      this.mediaSourceUsersRepository.find({
        where: {
          idUser,
          isWatched: true,
        },
      }),
      this.mediaSourceRepository.find({
        where: {
          idMedia,
        },
      }),
    ]);

    const mediaSourceWatchedIds = mediaSourceWatchedByUser.map(
      mediaSource => mediaSource.idMediaSource,
    );

    const remaining = mediaSourceOnGroup.filter(
      mediaSource => !mediaSourceWatchedIds.includes(mediaSource.id),
    );

    return {
      idUser,
      idMediaSourceGroup,
      idMedia,
      remaining,
    };
  }

  private async findOrCreateMediaSourceUsers(
    idUser: string,
    idMediaSource: string,
  ): Promise<MediaSourceUsersEntity> {
    let mediaSourceUsers = await this.mediaSourceUsersRepository.findOne({
      where: {
        idMediaSource,
        idUser,
      },
    });

    if (!mediaSourceUsers)
      mediaSourceUsers = await this.mediaSourceUsersRepository.save({
        idMediaSource,
        idUser,
      });

    return mediaSourceUsers;
  }
}
