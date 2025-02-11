import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetCurrentUser } from '../auth/auth.annotation';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CreateTicketDto } from './dto/create-tickets.dto';
import { TicketDto } from './dto/ticket.dto';
import { TicketsService } from './tickets.service';

@Controller('/v1/tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  create(
    @GetCurrentUser() user: CurrentUserDto,
    @Body() createTicketDto: CreateTicketDto,
  ): Promise<TicketDto> {
    const { id } = user;

    return this.ticketsService.create(id, createTicketDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getAll(@GetCurrentUser() user: CurrentUserDto): Promise<TicketDto[]> {
    const { id } = user;

    return this.ticketsService.getAll(id);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getOne(
    @GetCurrentUser() user: CurrentUserDto,
    @Param('id') idTicket: string,
  ): Promise<TicketDto> {
    const { id: idUser } = user;

    return this.ticketsService.getOne(idUser, idTicket);
  }
}
