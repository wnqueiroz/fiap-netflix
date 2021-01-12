import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { GenreEntity } from './genre.entity';
import { MediaEntity } from './media.entity';

@Entity({
  name: 'media_genres',
})
export class MediaGenresEntity {
  @PrimaryColumn('uuid')
  idGenre: string;

  @PrimaryColumn('uuid')
  idMedia: string;

  @ManyToOne(
    () => GenreEntity,
    genre => genre.id,
  )
  @JoinColumn({ name: 'idGenre' })
  genre: GenreEntity;

  @ManyToOne(
    () => MediaEntity,
    media => media.id,
  )
  @JoinColumn({ name: 'idMedia' })
  media: MediaEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
