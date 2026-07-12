import { Router } from "express";
import { AuthController } from "./controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { requireAuth, requireAdmin } from "./middleware";

const router = Router();

router.post("/login", asyncHandler(AuthController.login));
router.get("/me", requireAuth, asyncHandler(AuthController.me));
router.post("/users", requireAuth, requireAdmin, asyncHandler(AuthController.createUser));

export default router;
