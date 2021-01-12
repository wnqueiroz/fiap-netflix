import { Controller, Get, Param } from '@nestjs/common';
import { MediaDto } from './dto/media.dto';

import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get(':id')
  getOne(@Param('id') id: string): Promise<MediaDto> {
    return this.mediaService.getOne(id);
  }
}
