// src/modules/support/domain/entities/SupportTicket.ts
import { v4 as uuidv4 } from 'uuid';
import { SupportTicketId } from '../valueobjects/SupportTicketId';
import { UserId } from '../valueobjects/UserId';
import { MessageContent } from '../valueobjects/MessageContent';
import { Message } from './Message';

export type TicketStatus = 'abierto' | 'en-progreso' | 'resuelto' | 'cerrado';

export class SupportTicket {
  readonly id: SupportTicketId;
  readonly userId: UserId;
  readonly incidentDescription: string;
  public status: TicketStatus;
  private messages: Message[];
  readonly createdAt: Date;
  public updatedAt: Date;

  constructor(userId: UserId, incidentDescription: string) {
    this.id = uuidv4();
    this.userId = userId;
    this.incidentDescription = incidentDescription;
    this.status = 'abierto';
    this.messages = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  
  public addMessage(authorId: UserId, content: MessageContent): void {
    if (this.status === 'resuelto' || this.status === 'cerrado') {
      throw new Error('No se pueden añadir mensajes a un ticket resuelto o cerrado.');
    }
    const newMessage = new Message(authorId, content);
    this.messages.push(newMessage);
    this.updatedAt = new Date();
  }

  public resolveTicket(): void {
    this.status = 'resuelto';
    this.updatedAt = new Date();
  }
  
  public getMessages(): Message[] {
    return [...this.messages];
  }
}