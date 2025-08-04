// src/modules/support/application/use-cases/CreateSupportTicket.ts
import { SupportTicket } from "../../domain/entities/SupportTicket";
import { SupportTicketRepository } from "../../domain/repositories/SupportTicketRepository";
import { CreateSupportTicketDto } from "../dtos/CreateSupportTicket.dto";

export class CreateSupportTicket {
  constructor(private readonly repository: SupportTicketRepository) {}

  async execute(dto: CreateSupportTicketDto): Promise<SupportTicket> {
    const { userId, incidentDescription } = dto;
    
    const newTicket = new SupportTicket(userId, incidentDescription);
    
    await this.repository.save(newTicket);
    
    
    return newTicket;
  }
}