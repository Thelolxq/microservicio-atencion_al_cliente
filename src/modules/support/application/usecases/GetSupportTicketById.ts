import { SupportTicket } from "../../domain/entities/SupportTicket";
import { SupportTicketRepository } from "../../domain/repositories/SupportTicketRepository";
import { SupportTicketId } from "../../domain/valueobjects/SupportTicketId";

export class GetSupportTicketById {
  constructor(private readonly repository: SupportTicketRepository) {}

  async execute(id: SupportTicketId): Promise<SupportTicket | null> {
    return this.repository.findById(id);
  }
}