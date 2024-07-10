import { Router } from "express";
import { ModelScaleController } from "../controllers/ModelScaleController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const modelScaleController = new ModelScaleController();


router.post("/scales/models", authMiddleware, modelScaleController.create);
router.delete("/scales/models/:id", authMiddleware, modelScaleController.delete);
router.get('/scales/models', authMiddleware, modelScaleController.getAll);

export default router;
