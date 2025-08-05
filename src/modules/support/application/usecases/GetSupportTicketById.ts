import { SupportTicket } from "../../domain/entities/SupportTicket";
import { SupportTicketRepository } from "../../domain/repositories/SupportTicketRepository";
import { SupportTicketId } from "../../domain/valueobjects/SupportTicketId";

export class GetSupportTicketById {
  constructor(private readonly repository: SupportTicketRepository) {}

   async execute(id: string): Promise<SupportTicket | null> {
    try {
      const ticketIdVO = new SupportTicketId(id);
      
      return this.repository.findById(ticketIdVO);

    } catch (error) {
      console.error(`Error al buscar ticket por ID: ${(error as Error).message}`);
      throw error;
    }
  }
}