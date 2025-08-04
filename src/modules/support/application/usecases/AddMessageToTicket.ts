// src/modules/support/application/use-cases/AddMessageToTicket.ts
import { SupportTicketRepository } from "../../domain/repositories/SupportTicketRepository";
import { AddMessageToTicketDto } from "../dtos/AddMessageTicket.dto";
import { SupportTicket } from "../../domain/entities/SupportTicket";

export class AddMessageToTicket {
  constructor(private readonly repository: SupportTicketRepository) {}

  async execute(dto: AddMessageToTicketDto): Promise<SupportTicket> {
    const { ticketId, authorId, content } = dto;

    const ticket = await this.repository.findById(ticketId);

    if (!ticket) {
      throw new Error('Ticket no encontrado');
    }

    ticket.addMessage(authorId, content);

    await this.repository.save(ticket);

    return ticket;
  }
}