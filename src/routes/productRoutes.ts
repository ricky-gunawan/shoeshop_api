import express from "express";
import roleList from "../config/roleList";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controller/productController";
import verifyJWT from "../middleware/verifyJWT";
import verifyRoles from "../middleware/verifyRoles";

const router = express.Router();

router.route("/search").get(getProducts);

router.route("/").post(verifyJWT, verifyRoles(roleList.customer, roleList.admin), createProduct);

router.route("/:productId").get(getProduct).put(verifyJWT, verifyRoles(roleList.customer, roleList.admin), updateProduct).delete(verifyJWT, verifyRoles(roleList.customer, roleList.admin), deleteProduct);

// router.route("/search").get(getProducts);

// router.route("/").post(admin, createProduct);

// router.route("/:productId").get(getProduct).put(admin, updateProduct).delete(admin, deleteProduct);
export default router;
