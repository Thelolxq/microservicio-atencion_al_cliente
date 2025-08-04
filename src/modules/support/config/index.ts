import express from 'express';
import { InMemorySupportTicketRepository } from '../infrastructure/repositories/InMemorySupportTicketRepository';
import { CreateSupportTicket } from '../application/usecases/CreateSupportTicket';
import { GetSupportTicketById } from '../application/usecases/GetSupportTicketById';
import { SupportTicketController } from '../infrastructure/controllers/SupporTicket.controller';
import { AddMessageToTicket } from '../application/usecases/AddMessageToTicket';
import { GetAllSupportTickets } from '../application/usecases/GetAllSupportTickets';

async function main() {
    const app = express();
    app.use(express.json());

    const port = process.env.PORT || 3000;

    const supportTicketRepository = new InMemorySupportTicketRepository();

    const createSupportTicketUseCase = new CreateSupportTicket(supportTicketRepository);
    const getSupportTicketByIdUseCase = new GetSupportTicketById(supportTicketRepository);
    const addMessageToTicketUseCase = new AddMessageToTicket(supportTicketRepository)
    const getAllSupportTicketsUseCase = new GetAllSupportTickets(supportTicketRepository)

    const supportTicketController = new SupportTicketController(
        createSupportTicketUseCase,
        getSupportTicketByIdUseCase,
        addMessageToTicketUseCase,
        getAllSupportTicketsUseCase
    );

    app.post('/tickets', (req, res) => supportTicketController.create(req, res));
    app.get('/tickets/:id', (req, res) => supportTicketController.getById(req, res));
    app.post('/tickets/:id/messages', (req, res) => supportTicketController.addMessage(req, res));
    app.get('/tickets', (req, res)=> supportTicketController.getAll(req, res))

    app.listen(port, () => {
        console.log(`Servidor de soporte corriendo en http://localhost:${port}`);
    });
}

main();