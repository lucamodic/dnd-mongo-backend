import { Request, Response } from "express";
import { SpellService } from "./service";
import { ok } from "../../utils/response";

export const SpellController = {
  list: async (req: Request, res: Response) => {
    const { classId } = req.query;
    if (classId) return ok(res, await SpellService.byClass(String(classId)));
    ok(res, await SpellService.list());
  },
  show: async (req: Request, res: Response) => ok(res, await SpellService.show(req.params.id)),
  importAll: async (_req: Request, res: Response) => ok(res, await SpellService.importAll()),
  applyRecommended: async (_req: Request, res: Response) => ok(res, await SpellService.applyRecommended()),
  exportForSummary: async (_req: Request, res: Response) => ok(res, await SpellService.exportForSummary()),
  importSummaries: async (req: Request, res: Response) =>
    ok(res, await SpellService.importSummaries(req.body)),
};
