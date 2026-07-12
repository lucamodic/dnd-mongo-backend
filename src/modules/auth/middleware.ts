import { Request, Response, NextFunction } from "express";
import { verifyToken, TokenPayload } from "../../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

/** Exige un JWT válido en Authorization: Bearer <token>. */
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return res.status(401).json({ error: "Falta el token" });
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};

export const isDMRole = (role?: string) => role === "dm" || role === "admin";

/** Exige que el usuario autenticado sea DM (insomnya). */
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!isDMRole(req.user?.role)) {
    return res.status(403).json({ error: "Solo el DM puede hacer esto" });
  }
  next();
};
