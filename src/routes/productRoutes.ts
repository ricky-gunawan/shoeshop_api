import express from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controller/productController";

const router = express.Router();

router.route("/search").get(getProducts);

router.route("/").post(createProduct);

router.route("/:productId").get(getProduct).put(updateProduct).delete(deleteProduct);

export default router;
