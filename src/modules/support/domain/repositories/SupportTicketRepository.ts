import { SupportTicket } from "../entities/SupportTicket";
import { SupportTicketId } from "../valueobjects/SupportTicketId";

export interface SupportTicketRepository {
  findById(id: SupportTicketId): Promise<SupportTicket | null>;
  save(ticket: SupportTicket): Promise<void>;
  getAll(): Promise<SupportTicket[]>;
}