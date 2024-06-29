import {  Router } from "express";
import { ScheduleController } from "../controllers/ScheduleController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const scheduleController = new ScheduleController();

router.post("/schedule", authMiddleware, scheduleController.create);

export default router;
