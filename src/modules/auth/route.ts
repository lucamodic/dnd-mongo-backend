import { Router } from "express";
import { AuthController } from "./controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { requireAuth } from "./middleware";

const router = Router();

router.post("/login", asyncHandler(AuthController.login));
router.get("/me", requireAuth, asyncHandler(AuthController.me));

export default router;
