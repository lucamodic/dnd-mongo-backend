import { Router } from "express";
import { TrackerController } from "./controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { requireAuth, requireAdmin } from "../auth/middleware";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(TrackerController.get)); // polling
router.post("/join", asyncHandler(TrackerController.join)); // jugador suma su PJ
router.patch("/participants/:pid", asyncHandler(TrackerController.patchParticipant)); // admin o dueño
router.delete("/participants/:pid", asyncHandler(TrackerController.removeParticipant)); // admin o dueño

// Solo admin:
router.post("/participants", requireAdmin, asyncHandler(TrackerController.addParticipant));
router.patch("/", requireAdmin, asyncHandler(TrackerController.patchSettings));
router.post("/next", requireAdmin, asyncHandler(TrackerController.next));
router.post("/sort", requireAdmin, asyncHandler(TrackerController.sort));
router.post("/reset", requireAdmin, asyncHandler(TrackerController.reset));

export default router;
