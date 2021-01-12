import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { MediaTypeEntity } from './media-type.entity';

@Entity({
  name: 'media',
})
export class MediaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column('uuid', { nullable: false })
  idMediaType: string;

  @ManyToOne(
    () => MediaTypeEntity,
    mediaType => mediaType.id,
  )
  @JoinColumn({
    name: 'idMediaType',
  })
  mediaType: MediaTypeEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
