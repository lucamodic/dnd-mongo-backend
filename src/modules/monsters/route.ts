import { Router } from "express";
import { MonsterController } from "./controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { requireAuth, requireAdmin } from "../auth/middleware";

const router = Router();

router.get("/", requireAuth, asyncHandler(MonsterController.list)); // ?search= opcional
router.get("/:id", requireAuth, asyncHandler(MonsterController.show));
router.post("/import-all", requireAuth, requireAdmin, asyncHandler(MonsterController.importAll));

export default router;
