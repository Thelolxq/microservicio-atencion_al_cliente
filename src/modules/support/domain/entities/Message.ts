// src/modules/support/domain/entities/Message.ts
import { v4 as uuidv4 } from 'uuid';
import { UserId } from "../valueobjects/UserId";
import { MessageContent } from "../valueobjects/MessageContent";

export class Message {
  readonly id: string;
  readonly authorId: UserId;
  readonly content: MessageContent;
  readonly timestamp: Date;

  constructor(authorId: UserId, content: MessageContent) {
    this.id = uuidv4();
    this.authorId = authorId;
    this.content = content;
    this.timestamp = new Date();
  }
}