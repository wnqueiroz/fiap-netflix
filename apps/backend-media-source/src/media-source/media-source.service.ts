import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MediaSourceDto } from './dto/media-source.dto';
import { MediaSourceEntity } from './media-source.entity';

@Injectable()
export class MediaSourceService {
  constructor(
    @InjectRepository(MediaSourceEntity)
    private mediaSourceRepository: Repository<MediaSourceEntity>,
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
}
