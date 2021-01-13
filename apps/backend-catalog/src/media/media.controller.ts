import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetCurrentUser } from '../auth/auth.annotation';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

import { MediaDto } from './dto/media.dto';

import { MediaService } from './media.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

enum TOPICS {
  MEDIA_SOURCE_GET_REMAINING = 'media_source.get.remaining',
}

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(
    @Query('keyword') keyword?: string,
    @Query('idGenre') idGenre?: string,
  ): Promise<MediaDto[]> {
    return this.mediaService.getAll({
      keyword,
      idGenre,
    });
  }

  @Get('/most_watched')
  @UseGuards(JwtAuthGuard)
  getMostWatched(): Promise<MediaDto[]> {
    return this.mediaService.getMostWatched();
  }

  @Get('/watched')
  @UseGuards(JwtAuthGuard)
  getWatched(@GetCurrentUser() user: CurrentUserDto): Promise<MediaDto[]> {
    const { id: idUser } = user;

    return this.mediaService.getWatched(idUser);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id') id: string): Promise<MediaDto> {
    return this.mediaService.getOne(id);
  }

  @Post(':id/watch_later')
  @UseGuards(JwtAuthGuard)
  addToWatchLater(
    @GetCurrentUser() user: CurrentUserDto,
    @Param('id') idMedia: string,
  ): Promise<MediaDto> {
    const { id: idUser } = user;

    return this.mediaService.addToWatchLater(idUser, idMedia);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  likeOrUnlike(
    @GetCurrentUser() user: CurrentUserDto,
    @Param('id') idMedia: string,
  ): Promise<MediaDto> {
    const { id: idUser } = user;

    return this.mediaService.likeOrUnlike(idUser, idMedia);
  }

  @MessagePattern(TOPICS.MEDIA_SOURCE_GET_REMAINING)
  async getAllTopic(
    @Payload()
    message: {
      value: {
        idUser: string;
        idMedia: string;
        remaining: [];
      };
    },
  ): Promise<any | void> {
    await this.mediaService.setMediaAsWatched(message.value);
  }
}
