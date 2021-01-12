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
