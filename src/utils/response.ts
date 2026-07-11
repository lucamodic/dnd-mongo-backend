import { Response } from "express";

export const ok = (res: Response, data: unknown, status = 200) =>
  res.status(status).json({ data });

export const fail = (res: Response, error: string, status = 400) =>
  res.status(status).json({ error });

/** Error con status HTTP para tirar desde los services y capturar en el asyncHandler. */
export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
