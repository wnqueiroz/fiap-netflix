import { Controller, Get, Param, UseGuards } from '@nestjs/common';

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
}
