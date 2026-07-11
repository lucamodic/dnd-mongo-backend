import { Router } from "express";
import { SpellController } from "./controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { requireAuth, requireAdmin } from "../auth/middleware";

const router = Router();

router.get("/", requireAuth, asyncHandler(SpellController.list)); // ?classId= opcional
router.get("/export-summary", requireAuth, requireAdmin, asyncHandler(SpellController.exportForSummary));
router.get("/:id", requireAuth, asyncHandler(SpellController.show));
router.post("/import-all", requireAuth, requireAdmin, asyncHandler(SpellController.importAll));
router.post("/apply-recommended", requireAuth, requireAdmin, asyncHandler(SpellController.applyRecommended));
router.post("/import-summaries", requireAuth, requireAdmin, asyncHandler(SpellController.importSummaries));

export default router;
