import { Request, Response } from "express";
import { SubclassService } from "./service";
import { ok } from "../../utils/response";

export const SubclassController = {
  list: async (req: Request, res: Response) =>
    ok(res, await SubclassService.list(typeof req.query.classIndex === "string" ? req.query.classIndex : undefined)),
  show: async (req: Request, res: Response) => ok(res, await SubclassService.show(req.params.index)),
};
