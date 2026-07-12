import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { requireAuth, requireAdmin } from "../auth/middleware";
import { WeaponController } from "./controller";

const router = Router();

router.get("/", requireAuth, asyncHandler(WeaponController.list));
router.post("/", requireAuth, requireAdmin, asyncHandler(WeaponController.create));
router.post("/import-base", requireAuth, requireAdmin, asyncHandler(WeaponController.importBase));
router.post("/assign/:characterId", requireAuth, requireAdmin, asyncHandler(WeaponController.assign));

export default router;
