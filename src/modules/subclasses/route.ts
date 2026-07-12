import { Router } from "express";
import { SubclassController } from "./controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { requireAuth } from "../auth/middleware";

const router = Router();

router.get("/", requireAuth, asyncHandler(SubclassController.list));
router.get("/:index", requireAuth, asyncHandler(SubclassController.show));

export default router;
