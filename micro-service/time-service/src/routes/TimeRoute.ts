import { Router } from "express";
import timerController from "../controllers/TimeController";

const router = Router();

router.post("/submit-reaction-time", timerController.submitReactionTime);
router.post(
  "/delete-reaction-time",
  timerController.deleteReactionTimesByUserId
);
router.get("/reaction-time/:id", timerController.getReactionTimesByUserId);

export default router;
