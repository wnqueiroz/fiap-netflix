import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTicketDto } from './dto/create-tickets.dto';
import { TicketDto } from './dto/ticket.dto';

import { TicketEntity } from './ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntity)
    private ticketsRepository: Repository<TicketEntity>,
  ) {}

  create(idUser: string, createTicketDto: CreateTicketDto): Promise<TicketDto> {
    const data = {
      ...createTicketDto,
      idUser,
      isOpen: true,
    };

    return this.ticketsRepository.save(data);
  }

  getAll(idUser: string): Promise<TicketDto[]> {
    return this.ticketsRepository.find({
      where: {
        idUser,
      },
    });
  }

  async getOne(idUser: string, idTicket: string): Promise<TicketDto> {
    const ticket = await this.ticketsRepository.findOne({
      where: {
        id: idTicket,
        idUser,
      },
    });

    if (!ticket) throw new NotFoundException('Ticket not found');

    return ticket;
  }
}
