import { v4 as uuidv4, validate as isUuid } from 'uuid';

export class SupportTicketId {
  private readonly value: string;

  constructor(id?: string) {
    if (id) {
      if (!isUuid(id)) {
        throw new Error('El SupportTicketId proporcionado no tiene un formato de UUID válido.');
      }
      this.value = id;
    } else {
      this.value = uuidv4();
    }
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: SupportTicketId): boolean {
    return this.value === other.getValue();
  }
}