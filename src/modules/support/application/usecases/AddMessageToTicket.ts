// src/modules/support/application/use-cases/AddMessageToTicket.ts
import { SupportTicketRepository } from "../../domain/repositories/SupportTicketRepository";
import { AddMessageToTicketDto } from "../dtos/AddMessageTicket.dto";
import { SupportTicket } from "../../domain/entities/SupportTicket";
import { SupportTicketId } from "../../domain/valueobjects/SupportTicketId";
import { UserId } from "../../domain/valueobjects/UserId";
import { MessageContent } from "../../domain/valueobjects/MessageContent";

export class AddMessageToTicket {
  constructor(private readonly repository: SupportTicketRepository) {}

  async execute(dto: AddMessageToTicketDto): Promise<SupportTicket> {
    try {
      const ticketIdVO = new SupportTicketId(dto.ticketId);
      const authorIdVO = new UserId(dto.authorId);
      const contentVO = new MessageContent(dto.content);

      const ticket = await this.repository.findById(ticketIdVO);

      if (!ticket) {
        throw new Error('Ticket no encontrado');
      }

      ticket.addMessage(authorIdVO, contentVO);

      await this.repository.save(ticket);

      return ticket;
    } catch (error) {
        console.error("Error al crear objetos de valor:", error);
        throw new Error(`Datos inválidos: ${(error as Error).message}`);
    }
  }
}