import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Column,
} from 'typeorm';

import { MediaEntity } from './media.entity';

@Entity({
  name: 'media_users',
})
export class MediaUsersEntity {
  @PrimaryColumn('uuid')
  idUser: string;

  @PrimaryColumn('uuid')
  idMedia: string;

  @ManyToOne(
    () => MediaEntity,
    media => media.id,
  )
  @JoinColumn({ name: 'idMedia' })
  media: MediaEntity;

  @Column({ nullable: false, default: false })
  isLiked: boolean;

  @Column({ nullable: false, default: false })
  isWatchLater: boolean;

  @Column({ nullable: false, default: false })
  isWatched: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
