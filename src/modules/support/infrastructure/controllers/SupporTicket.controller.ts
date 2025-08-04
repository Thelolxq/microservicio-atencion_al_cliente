// src/modules/support/infrastructure/controllers/SupportTicket.controller.ts
import { Request, Response } from 'express';
import { CreateSupportTicket } from '../../application/usecases/CreateSupportTicket';
import { GetSupportTicketById } from '../../application/usecases/GetSupportTicketById';
import { AddMessageToTicket } from '../../application/usecases/AddMessageToTicket';
import { GetAllSupportTickets } from '../../application/usecases/GetAllSupportTickets';
export class SupportTicketController {

  constructor(
    private readonly createSupportTicketUseCase: CreateSupportTicket,
    private readonly getSupportTicketByIdUseCase: GetSupportTicketById,
    private readonly addMessageToTicketUseCase: AddMessageToTicket,
    private readonly getAllSupportTicketsUseCase : GetAllSupportTickets
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { userId, incidentDescription } = req.body;
      if (!userId || !incidentDescription) {
        res.status(400).json({ message: 'userId y incidentDescription son requeridos' });
        return;
      }

      const ticket = await this.createSupportTicketUseCase.execute({ userId, incidentDescription });
      res.status(201).json(ticket);
    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
        if (!id) {
        res.status(400).json({ message: 'El ID del ticket es requerido en la URL.' });
        return;
      }
      const ticket = await this.getSupportTicketByIdUseCase.execute(id);

      if (ticket) {
        res.status(200).json(ticket);
      } else {
        res.status(404).json({ message: 'Ticket no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
   async addMessage(req: Request, res: Response): Promise<void> {
    try {
      const { id: ticketId } = req.params;
      const { authorId, content } = req.body;

      if (!authorId || !content) {
        res.status(400).json({ message: 'authorId y content son requeridos' });
        return;
      }
      if(!ticketId){
         res.status(400).json({ message: 'El ID del ticket es requerido en la URL.' });
        return;
      }
      
      const updatedTicket = await this.addMessageToTicketUseCase.execute({
        ticketId,
        authorId,
        content
      });

      res.status(200).json(updatedTicket);

    } catch (error) {
      if (error instanceof Error && error.message === 'Ticket no encontrado') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error interno del servidor' });
      }
    }
  }

  async getAll(_req: Request, res: Response): Promise<void>{
    try{
        const tickets = await this.getAllSupportTicketsUseCase.execute()
        res.status(200).json(tickets)
    }catch(error){
        res.status(500).json({message: 'Error interno del servidor'})
    }
  }

}
