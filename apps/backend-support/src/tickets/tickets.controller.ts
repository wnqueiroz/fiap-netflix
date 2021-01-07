import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { CreateTicketDto } from './dto/create-tickets.dto';
import { CreatedTicketDto } from './dto/created-ticket.dto';
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
  ): Promise<CreatedTicketDto> {
    const { id } = req.user;

    return this.ticketsService.create(id, createTicketDto);
  }
}
