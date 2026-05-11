import { Router } from "express";
import * as controller from "../controllers/user.controller";

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/users", controller.getAllUsers);
router.get("/orders", controller.getAllOrders);
router.post("/orders", controller.createOrder);

export default router;