import { Express, Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const userController = new UserController();

router.post("/user", userController.create);
router.post("/login", userController.login);
router.post("/profile", authMiddleware, userController.getProfile);
router.delete("/delete/:id", authMiddleware, userController.delete);
router.put("/update/:id", authMiddleware, userController.update);
export default router;