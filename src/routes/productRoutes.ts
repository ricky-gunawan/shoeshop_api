import express from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controller/productController";
import { admin } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/search").get(getProducts);

router.route("/").post(admin, createProduct);

router.route("/:productId").get(getProduct).put(admin, updateProduct).delete(admin, deleteProduct);

export default router;
