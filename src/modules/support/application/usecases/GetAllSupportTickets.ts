import { SupportTicket } from "../../domain/entities/SupportTicket";
import { SupportTicketRepository } from "../../domain/repositories/SupportTicketRepository";


export class  GetAllSupportTickets{
    constructor(private readonly repository: SupportTicketRepository){}

    async execute(): Promise<SupportTicket[]>{
            return this.repository.getAll()
    }
}