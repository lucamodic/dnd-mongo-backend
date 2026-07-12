import { Request, Response } from "express";
import { WeaponService } from "./service";
import { ok } from "../../utils/response";

export const WeaponController = {
  list: async (_req: Request, res: Response) => ok(res, await WeaponService.list()),
  create: async (req: Request, res: Response) => ok(res, await WeaponService.create(req.user!, req.body || {}), 201),
  assign: async (req: Request, res: Response) =>
    ok(res, await WeaponService.assign(req.user!, req.params.characterId, String(req.body?.weaponIndex || ""))),
  importBase: async (_req: Request, res: Response) => ok(res, await WeaponService.importBase()),
};
