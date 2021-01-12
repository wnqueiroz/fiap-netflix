import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Column,
} from 'typeorm';
import { MediaSourceEntity } from './media-source.entity';

@Entity({
  name: 'media_source_users',
})
export class MediaSourceUsersEntity {
  @PrimaryColumn('uuid')
  idUser: string;

  @PrimaryColumn('uuid')
  idMediaSource: string;

  @ManyToOne(
    () => MediaSourceEntity,
    mediaSource => mediaSource.id,
  )
  @JoinColumn({ name: 'idMediaSource' })
  mediaSource: MediaSourceEntity;

  @Column({ nullable: false, default: false })
  isWatched: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
