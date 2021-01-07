import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TicketEntity } from './ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity])],
  providers: [TicketsService],
  controllers: [TicketsController],
})
export class TicketsModule {}
