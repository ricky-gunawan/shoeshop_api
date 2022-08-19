import express from "express";
import { getProducts, getProduct } from "../controller/productController";

const router = express.Router();

router.route("/search").get(getProducts);

router.route("/").post();

router.route("/:id").get(getProduct).put().delete();

export default router;
