import { Router } from "express";
import { ClassController } from "./controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { requireAuth, requireAdmin } from "../auth/middleware";

const router = Router();

router.get("/", requireAuth, asyncHandler(ClassController.list));
router.get("/:id", requireAuth, asyncHandler(ClassController.show));
router.post("/import-all", requireAuth, requireAdmin, asyncHandler(ClassController.importAll));

export default router;
