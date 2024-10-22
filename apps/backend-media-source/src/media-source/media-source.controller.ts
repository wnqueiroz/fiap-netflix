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
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

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
  USERS_MEDIA_SOURCES_WATCHED = 'users.media_sources.watched',
  USERS_MEDIA_SOURCES_ANALYZED = 'users.media_sources.analyzed',
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

    this.client.emit(TOPICS.USERS_MEDIA_SOURCES_WATCHED, {
      idUser,
      mediaSource: { ...mediaSource },
    });

    return mediaSource;
  }

  @MessagePattern(TOPICS.USERS_MEDIA_SOURCES_WATCHED)
  async getAllTopic(
    @Payload()
    message: {
      value: { idUser: string; mediaSource: MediaSourceDto };
    },
  ): Promise<any | void> {
    const {
      value: { idUser, mediaSource },
    } = message;

    const mediaSourceRemainingUnwatched = await this.mediaSourceService.getRemainingUnwatched(
      idUser,
      mediaSource,
    );

    await this.client
      .emit(TOPICS.USERS_MEDIA_SOURCES_ANALYZED, {
        ...mediaSourceRemainingUnwatched,
      })
      .toPromise(); // use .emit when you want to fire an event from another
  }
}
