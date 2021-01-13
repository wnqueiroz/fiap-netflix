import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { GetCurrentUser } from '../auth/auth.annotation';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { MediaSourceDto } from './dto/media-source.dto';
import { MediaSourceService } from './media-source.service';

import { IsNotEmpty, IsUUID } from 'class-validator';
import { ClientKafka } from '@nestjs/microservices';

export class GetAllQuery {
  @IsUUID('all', {
    message: 'O query.idMedia deve ser um UUID válido',
  })
  @IsNotEmpty({
    message: 'Informe o id da media em query.idMedia',
  })
  idMedia: string;
}

enum TOPICS {
  MEDIA_SOURCE_WATCHED = 'media_source.watched',
}

@Controller('media-source')
export class MediaSourceController {
  constructor(
    private readonly mediaSourceService: MediaSourceService,
    @Inject('MEDIA_SOURCE_SERVICE') private client: ClientKafka,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Query() query: GetAllQuery): Promise<MediaSourceDto> {
    const { idMedia } = query;
    return this.mediaSourceService.getAll(idMedia);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id') id: string): Promise<MediaSourceDto> {
    return this.mediaSourceService.getOne(id);
  }

  @Post(':id/watched')
  @UseGuards(JwtAuthGuard)
  async setAsWatched(
    @GetCurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
  ): Promise<MediaSourceDto> {
    const { id: idUser } = user;

    const mediaSource = await this.mediaSourceService.setAsWatched(idUser, id);

    this.client.emit(TOPICS.MEDIA_SOURCE_WATCHED, { ...mediaSource });

    return mediaSource;
  }
}
