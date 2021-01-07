import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTicketDto } from './dto/create-tickets.dto';
import { CreatedTicketDto } from './dto/created-ticket.dto';

import { TicketEntity } from './ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntity)
    private ticketsRepository: Repository<TicketEntity>,
  ) {}

  create(
    idUser: string,
    createTicketDto: CreateTicketDto,
  ): Promise<CreatedTicketDto> {
    const data = {
      ...createTicketDto,
      idUser,
      isOpen: true,
    };

    return this.ticketsRepository.save(data);
  }
}
