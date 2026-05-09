import { Router } from "express";
import * as controller from "../controllers/product.controller";
import { validateProduct } from "../middleware/validateProduct";

const router = Router();

router.get("/", controller.getProducts);
router.get("/:id", controller.getProduct);
router.post("/", validateProduct, controller.createProduct);
router.put("/:id", validateProduct, controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

export default router;