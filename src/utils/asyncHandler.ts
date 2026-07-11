import { NextFunction, Request, Response } from "express";
import { HttpError } from "./response";

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/**
 * Envuelve un handler async y centraliza el manejo de errores.
 * Si el service tira un HttpError, respeta su status; si no, 500.
 */
export const asyncHandler =
  (fn: Handler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      const status = err instanceof HttpError ? err.status : 500;
      const message = err?.message || "Error interno del servidor";
      if (status >= 500) console.error("[error]", err);
      res.status(status).json({ error: message });
    });
  };
