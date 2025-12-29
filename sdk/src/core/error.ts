export class VyomaError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "VyomaError";
    this.status = status;
    this.code = code;
  }
}
