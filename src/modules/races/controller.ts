import { Request, Response } from "express";
import { RaceService } from "./service";
import { ok } from "../../utils/response";

export const RaceController = {
  list: async (_req: Request, res: Response) => ok(res, await RaceService.list()),
  show: async (req: Request, res: Response) => ok(res, await RaceService.show(req.params.id)),
  importAll: async (_req: Request, res: Response) => ok(res, await RaceService.importAll()),
};
