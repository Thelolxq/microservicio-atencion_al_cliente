import { SupportTicket } from "../../domain/entities/SupportTicket";
import { SupportTicketRepository } from "../../domain/repositories/SupportTicketRepository";
import { SupportTicketId } from "../../domain/valueobjects/SupportTicketId";

export class InMemorySupportTicketRepository implements SupportTicketRepository {
  private readonly tickets = new Map<String, SupportTicket>();

  async findById(id: SupportTicketId): Promise<SupportTicket | null> {
    const ticket = this.tickets.get(id.getValue());
    return ticket || null;
  }

  async save(ticket: SupportTicket): Promise<void> {
    this.tickets.set(ticket.id.getValue(), ticket);
  }
  
  async getAll(): Promise<SupportTicket[]> {
      return Array.from(this.tickets.values());
  }
}