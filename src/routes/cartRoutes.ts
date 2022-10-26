import express from "express";
import roleList from "../config/roleList";
import { deleteCart, getCart, getCarts, updateCart } from "../controller/cartController";
import verifyRoles from "../middleware/verifyRoles";

const router = express.Router();

router.route("/").put(verifyRoles(roleList.customer), updateCart).get(verifyRoles(roleList.customer, roleList.admin), getCarts);

router.route("/:userId").get(verifyRoles(roleList.customer), getCart).delete(verifyRoles(roleList.customer, roleList.admin), deleteCart);

// router.route("/").put(protect, updateCart).get(admin, getCarts);

// router.route("/:userId").get(protect, getCart).delete(admin, deleteCart);
export default router;
