// src/modules/support/application/use-cases/CreateSupportTicket.ts
import { SupportTicket } from "../../domain/entities/SupportTicket";
import { SupportTicketRepository } from "../../domain/repositories/SupportTicketRepository";
import { CreateSupportTicketDto } from "../dtos/CreateSupportTicket.dto";
import { UserId } from "../../domain/valueobjects/UserId";
export class CreateSupportTicket {
  constructor(private readonly repository: SupportTicketRepository) {}

  async execute(dto: CreateSupportTicketDto): Promise<SupportTicket> {
    const { userId, incidentDescription } = dto;
    
   try {
      const userIdValueObject = new UserId(userId);

      const newTicket = new SupportTicket(userIdValueObject, incidentDescription);
      
      await this.repository.save(newTicket);
      return newTicket;
    } catch (error) {
      console.error(error);
      throw new Error('El ID de usuario proporcionado no es válido.');
    }
  }
}