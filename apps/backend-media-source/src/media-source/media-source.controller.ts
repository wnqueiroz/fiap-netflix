import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';

import { GetCurrentUser } from '../auth/auth.annotation';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { MediaSourceDto } from './dto/media-source.dto';
import { MediaSourceService } from './media-source.service';

import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetAllQuery {
  @IsUUID('all', {
    message: 'O query.idMedia deve ser um UUID válido',
  })
  @IsNotEmpty({
    message: 'Informe o id da media em query.idMedia',
  })
  idMedia: string;
}

@Controller('media-source')
export class MediaSourceController {
  constructor(private readonly mediaSourceService: MediaSourceService) {}

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
  setAsWatched(
    @GetCurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
  ): Promise<MediaSourceDto> {
    const { id: idUser } = user;

    return this.mediaSourceService.setAsWatched(idUser, id);
  }
}
