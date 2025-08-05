import { v4 as uuidv4, validate as isUuid } from 'uuid';

export class UserId {
  private readonly value: string;
  constructor(id: string) {
    if (!id || id.trim().length === 0) {
      throw new Error('El UserId no puede ser nulo o vacío.');
    }
    // if (!isUuid(id)) {
    //   throw new Error('El UserId debe tener un formato de UUID válido.');
    // }
    this.value = id;
  }
  public getValue(): string {
    return this.value;
  }
  public equals(other: UserId): boolean {
    return this.value === other.getValue();
  }
}