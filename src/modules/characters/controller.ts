import { Request, Response } from "express";
import { CharacterService } from "./service";
import { ok } from "../../utils/response";

export const CharacterController = {
  list: async (req: Request, res: Response) => ok(res, await CharacterService.list(req.user!.id)),
  show: async (req: Request, res: Response) =>
    ok(res, await CharacterService.show(req.user!.id, req.params.id)),
  create: async (req: Request, res: Response) =>
    ok(res, await CharacterService.create(req.user!.id, req.body), 201),
  levelUp: async (req: Request, res: Response) =>
    ok(res, await CharacterService.levelUp(req.user!.id, req.params.id, Number(req.body?.rolled))),
  setHp: async (req: Request, res: Response) =>
    ok(res, await CharacterService.setHp(req.user!.id, req.params.id, Number(req.body?.currentHp))),
  update: async (req: Request, res: Response) =>
    ok(res, await CharacterService.update(req.user!.id, req.params.id, req.body)),
  remove: async (req: Request, res: Response) =>
    ok(res, await CharacterService.remove(req.user!.id, req.params.id)),
};
