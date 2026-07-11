import { Router } from "express";
import authRoutes from "./auth/route";
import raceRoutes from "./races/route";
import classRoutes from "./classes/route";
import spellRoutes from "./spells/route";
import characterRoutes from "./characters/route";
import monsterRoutes from "./monsters/route";
import trackerRoutes from "./tracker/route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/races", raceRoutes);
router.use("/classes", classRoutes);
router.use("/spells", spellRoutes);
router.use("/characters", characterRoutes);
router.use("/monsters", monsterRoutes);
router.use("/tracker", trackerRoutes);

export default router;
