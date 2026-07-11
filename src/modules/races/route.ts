import { Router } from "express";
import { RaceController } from "./controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { requireAuth, requireAdmin } from "../auth/middleware";

const router = Router();

router.get("/", requireAuth, asyncHandler(RaceController.list));
router.get("/:id", requireAuth, asyncHandler(RaceController.show));
router.post("/import-all", requireAuth, requireAdmin, asyncHandler(RaceController.importAll));

export default router;
