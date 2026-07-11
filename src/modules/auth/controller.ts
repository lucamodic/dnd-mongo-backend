import { Request, Response } from "express";
import { AuthService } from "./service";
import { ok } from "../../utils/response";

export const AuthController = {
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body || {};
    const result = await AuthService.login(username, password);
    ok(res, result);
  },

  me: async (req: Request, res: Response) => {
    const result = await AuthService.me(req.user!.id);
    ok(res, result);
  },
};
