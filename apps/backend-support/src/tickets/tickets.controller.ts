import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { CreateTicketDto } from './dto/create-tickets.dto';
import { TicketDto } from './dto/ticket.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TicketsService } from './tickets.service';

@Controller('/v1/tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Request() req: { user: { id: string } },
    @Body() createTicketDto: CreateTicketDto,
  ): Promise<TicketDto> {
    const { id } = req.user;

    return this.ticketsService.create(id, createTicketDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Request() req: { user: { id: string } }): Promise<TicketDto[]> {
    const { id } = req.user;

    return this.ticketsService.getAll(id);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getOne(
    @Request() req: { user: { id: string } },
    @Param('id') idTicket: string,
  ): Promise<TicketDto> {
    const { id: idUser } = req.user;

    return this.ticketsService.getOne(idUser, idTicket);
  }
}
