import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { MediaSourceGroupEntity } from './media-source-group.entity';

@Entity({
  name: 'media_source',
})
export class MediaSourceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: false })
  idMedia: string;

  @Column('uuid', { nullable: true })
  idMediaSourceGroup: string;

  @ManyToOne(
    () => MediaSourceGroupEntity,
    mediaSourceGroup => mediaSourceGroup.id,
  )
  @JoinColumn({
    name: 'idMediaSourceGroup',
  })
  mediaSourceGroup: MediaSourceGroupEntity;

  @Column({ nullable: false })
  source: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  duration: number;

  @Column({ nullable: false, default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
