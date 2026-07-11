import { Request, Response } from "express";
import { MonsterService } from "./service";
import { ok } from "../../utils/response";

export const MonsterController = {
  list: async (req: Request, res: Response) =>
    ok(res, await MonsterService.list(req.query.search ? String(req.query.search) : undefined)),
  show: async (req: Request, res: Response) => ok(res, await MonsterService.show(req.params.id)),
  importAll: async (_req: Request, res: Response) => ok(res, await MonsterService.importAll()),
};
