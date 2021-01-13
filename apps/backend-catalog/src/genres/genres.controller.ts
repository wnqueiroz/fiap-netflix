import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { GenreDto } from './dto/genre.dto';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(): Promise<GenreDto[]> {
    return this.genresService.getAll();
  }
}
