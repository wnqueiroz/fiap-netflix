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

  @ManyToOne(
    () => MediaSourceGroupEntity,
    mediaSourceGroup => mediaSourceGroup.id,
  )
  @JoinColumn({
    name: 'idMediaSourceGroup',
  })
  idMediaSourceGroup: MediaSourceGroupEntity;

  @Column({ nullable: false })
  source: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  duration: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
