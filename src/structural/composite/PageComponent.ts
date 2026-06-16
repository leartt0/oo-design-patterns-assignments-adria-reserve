export interface PageComponent {
  render(indent?: number): string;
  getName(): string;
}

export abstract class BasePageComponent implements PageComponent {
  constructor(protected name: string) {}

  getName(): string {
    return this.name;
  }

  protected indent(level: number): string {
    return "  ".repeat(level);
  }

  abstract render(indent?: number): string;
}
