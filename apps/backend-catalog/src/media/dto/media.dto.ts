export class MediaDto {
  id: string;

  title: string;

  description: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<MediaDto>) {
    Object.assign(this, partial);
  }
}
