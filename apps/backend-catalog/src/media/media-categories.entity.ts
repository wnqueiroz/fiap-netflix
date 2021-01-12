import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { CategoryEntity } from './category.entity';
import { MediaEntity } from './media.entity';

@Entity({
  name: 'media_categories',
})
export class MediaCategoriesEntity {
  @PrimaryColumn('uuid')
  idCategory: string;

  @PrimaryColumn('uuid')
  idMedia: string;

  @ManyToOne(
    () => CategoryEntity,
    category => category.id,
  )
  @JoinColumn({ name: 'idCategory' })
  category: CategoryEntity;

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
