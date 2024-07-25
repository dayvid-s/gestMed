import { Router } from "express";
import { MainScaleController } from "../controllers/MainScaleController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const mainScaleController = new MainScaleController();

router.post("/scales/main", authMiddleware, mainScaleController.create);
router.get("/scales/main", authMiddleware, mainScaleController.getAll);
router.get("/scales/main/:id", authMiddleware, mainScaleController.getById);
router.put("/scales/main/:id", authMiddleware, mainScaleController.update);

export default router;