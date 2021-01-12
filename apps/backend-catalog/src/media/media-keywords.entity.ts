import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { KeywordEntity } from './keyword.entity';
import { MediaEntity } from './media.entity';

@Entity({
  name: 'media_keywords',
})
export class MediaKeywordsEntity {
  @PrimaryColumn('uuid')
  idKeyword: string;

  @PrimaryColumn('uuid')
  idMedia: string;

  @ManyToOne(
    () => KeywordEntity,
    keyword => keyword.id,
  )
  @JoinColumn({ name: 'idKeyword' })
  keyword: KeywordEntity;

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
