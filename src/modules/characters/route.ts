import { Router } from "express";
import { CharacterController } from "./controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { requireAuth } from "../auth/middleware";

const router = Router();

router.use(requireAuth); // todo lo de personajes requiere estar logueado

router.get("/", asyncHandler(CharacterController.list));
router.post("/", asyncHandler(CharacterController.create));
router.post("/roll-stats", asyncHandler(CharacterController.rollStats));
router.get("/:id", asyncHandler(CharacterController.show));
router.patch("/:id", asyncHandler(CharacterController.update));
router.delete("/:id", asyncHandler(CharacterController.remove));
router.post("/:id/subclass", asyncHandler(CharacterController.chooseSubclass));
router.post("/:id/level-up", asyncHandler(CharacterController.levelUp));
router.post("/:id/hp", asyncHandler(CharacterController.setHp));
router.post("/:id/full-rest", asyncHandler(CharacterController.fullRest));
router.post("/:id/short-rest", asyncHandler(CharacterController.shortRest));

export default router;
