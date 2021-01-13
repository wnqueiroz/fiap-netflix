import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GenreEntity } from './genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(GenreEntity)
    private genreRepository: Repository<GenreEntity>,
  ) {}

  getAll(): Promise<GenreEntity[]> {
    return this.genreRepository.find();
  }

  getOne(idGenre: string): Promise<GenreEntity> {
    return this.genreRepository.findOne(idGenre);
  }
}
