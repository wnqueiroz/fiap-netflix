import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetCurrentUser } from '../auth/auth.annotation';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

import { MediaDto } from './dto/media.dto';

import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

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
}
