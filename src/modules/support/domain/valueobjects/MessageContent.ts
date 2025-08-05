
export class MessageContent {
  private readonly value: string;

  constructor(content: string) {
    if (!content || content.trim().length === 0) {
      throw new Error('El contenido del mensaje no puede estar vacío.');
    }
    
    if (content.length > 1000) {
      throw new Error('El contenido del mensaje no puede exceder los 1000 caracteres.');
    }

    this.value = content;
  }

  public getValue(): string {
    return this.value;
  }
}