import { Router } from "express";
import { MainScaleController } from "../controllers/MainScaleController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const mainScaleController = new MainScaleController();

router.post("/scales/main", authMiddleware, mainScaleController.create);
router.post('/scales/main/duties/copy-from-model/:model_scale_id', authMiddleware, mainScaleController.transformModelScaleIntoMainScale);
router.get("/scales/main", authMiddleware, mainScaleController.getAll);
router.put("/scales/main/:id", authMiddleware, mainScaleController.update);

export default router;