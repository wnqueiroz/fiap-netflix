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

    let mediaUsers = await this.mediaUsersRepository.findOne({
      where: {
        idMedia: media.id,
        idUser,
      },
    });

    if (!mediaUsers)
      mediaUsers = await this.mediaUsersRepository.save({
        idMedia: media.id,
        idUser,
      });

    mediaUsers = { ...mediaUsers, isWatchLater: true };

    await this.mediaUsersRepository.save(mediaUsers);

    return media;
  }
}
