import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MediaDto } from './dto/media.dto';

import { MediaUsersEntity } from './media-users.entity';
import { MediaEntity } from './media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
    @InjectRepository(MediaUsersEntity)
    private mediaUsersRepository: Repository<MediaUsersEntity>,
  ) {}

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
