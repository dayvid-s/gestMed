import { Router } from "express";
import { ModelScaleController } from "../controllers/ModelScaleController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const modelScaleController = new ModelScaleController();

router.post("/scales/models", authMiddleware, modelScaleController.create);
router.get("/scales/models", authMiddleware, modelScaleController.getAll);
router.get("/scales/models/:id", authMiddleware, modelScaleController.getById);
router.put("/scales/models/:id", authMiddleware, modelScaleController.update);
router.delete("/scales/models/:id", authMiddleware, modelScaleController.delete);

export default router;
