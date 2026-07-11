import { Request, Response } from "express";
import { ClassService } from "./service";
import { ok } from "../../utils/response";

export const ClassController = {
  list: async (_req: Request, res: Response) => ok(res, await ClassService.list()),
  show: async (req: Request, res: Response) => ok(res, await ClassService.show(req.params.id)),
  importAll: async (_req: Request, res: Response) => ok(res, await ClassService.importAll()),
};
