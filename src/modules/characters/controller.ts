import { Request, Response } from "express";
import { CharacterService } from "./service";
import { ok } from "../../utils/response";

export const CharacterController = {
  list: async (req: Request, res: Response) => ok(res, await CharacterService.list(req.user!)),
  show: async (req: Request, res: Response) =>
    ok(res, await CharacterService.show(req.user!, req.params.id)),
  create: async (req: Request, res: Response) =>
    ok(res, await CharacterService.create(req.user!.id, req.body), 201),
  rollStats: async (req: Request, res: Response) =>
    ok(res, await CharacterService.rollStats(req.body?.classId)),
  levelUp: async (req: Request, res: Response) =>
    ok(res, await CharacterService.levelUp(req.user!, req.params.id, Number(req.body?.rolled))),
  setHp: async (req: Request, res: Response) =>
    ok(res, await CharacterService.setHp(req.user!.id, req.params.id, Number(req.body?.currentHp))),
  update: async (req: Request, res: Response) =>
    ok(res, await CharacterService.update(req.user!, req.params.id, req.body)),
  remove: async (req: Request, res: Response) =>
    ok(res, await CharacterService.remove(req.user!, req.params.id)),
};
