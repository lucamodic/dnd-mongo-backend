import { Request, Response } from "express";
import { TrackerService } from "./service";
import { ok } from "../../utils/response";

export const TrackerController = {
  get: async (req: Request, res: Response) => ok(res, await TrackerService.get(req.user!)),
  join: async (req: Request, res: Response) =>
    ok(res, await TrackerService.join(req.user!, req.body?.characterId, Number(req.body?.initiative) || 0)),
  addParticipant: async (req: Request, res: Response) =>
    ok(res, await TrackerService.addParticipant(req.body || {})),
  patchParticipant: async (req: Request, res: Response) =>
    ok(res, await TrackerService.patchParticipant(req.user!, req.params.pid, req.body || {})),
  patchSettings: async (req: Request, res: Response) =>
    ok(res, await TrackerService.patchSettings(req.body || {})),
  removeParticipant: async (req: Request, res: Response) =>
    ok(res, await TrackerService.removeParticipant(req.user!, req.params.pid)),
  next: async (_req: Request, res: Response) => ok(res, await TrackerService.next()),
  sort: async (_req: Request, res: Response) => ok(res, await TrackerService.sort()),
  reset: async (req: Request, res: Response) =>
    ok(res, await TrackerService.reset(req.body?.keepPlayers !== false)),
};
