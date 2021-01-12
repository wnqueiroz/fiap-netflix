import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { GetCurrentUser } from '../auth/auth.annotation';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { MediaSourceDto } from './dto/media-source.dto';
import { MediaSourceService } from './media-source.service';

@Controller('media-source')
export class MediaSourceController {
  constructor(private readonly mediaSourceService: MediaSourceService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id') id: string): Promise<MediaSourceDto> {
    return this.mediaSourceService.getOne(id);
  }

  @Post(':id/watched')
  @UseGuards(JwtAuthGuard)
  setAsWatched(
    @GetCurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
  ): Promise<MediaSourceDto> {
    const { id: idUser } = user;

    return this.mediaSourceService.setAsWatched(idUser, id);
  }
}
