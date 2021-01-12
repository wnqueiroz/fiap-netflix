import { Exclude } from 'class-transformer';

export class TicketDto {
  id: string;

  @Exclude()
  idUser: string;

  title: string;

  description: string;

  isOpen: boolean;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<TicketDto>) {
    Object.assign(this, partial);
  }
}
