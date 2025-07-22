import { Response } from "express";

export default class ApiResponse {
  private status: boolean = true;
  private message: string = "";
  private data: any = null;

  constructor(private readonly response: Response) {}

  setStatus(status: boolean): this {
    this.status = status;
    return this;
  }

  setMessage(message: string): this {
    this.message = message;
    return this;
  }

  setData(data: any): this {
    this.data = data;
    return this;
  }

  send(statusCode: number = 200): Response {
    return this.response.status(statusCode).json({
      status: this.status,
      message: this.message,
      data: this.data,
    });
  }
}
