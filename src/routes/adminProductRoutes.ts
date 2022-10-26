import express from "express";
import { createProduct, deleteProduct, updateProduct } from "../controller/admin/product";

const adminProductRoutes = express.Router();

adminProductRoutes.route("/").post(createProduct);

adminProductRoutes.route("/:productId").put(updateProduct).delete(deleteProduct);

export default adminProductRoutes;
