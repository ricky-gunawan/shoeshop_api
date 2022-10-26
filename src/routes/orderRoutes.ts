import express from "express";
import roleList from "../config/roleList";
import { createOrder, deleteOrder, getAllOrders, getOrder, getUserOrders, updateOrder } from "../controller/orderController";
import verifyRoles from "../middleware/verifyRoles";

const router = express.Router();

router.route("/").get(verifyRoles(roleList.customer), getUserOrders).post(verifyRoles(roleList.customer), createOrder);

router.route("/admin").get(verifyRoles(roleList.customer, roleList.admin), getAllOrders);

router.route("/:orderId").get(verifyRoles(roleList.customer, roleList.admin), getOrder).put(verifyRoles(roleList.customer, roleList.admin), updateOrder).delete(verifyRoles(roleList.customer, roleList.admin), deleteOrder);

// router.route("/").get(protect, getUserOrders).post(protect, createOrder);

// router.route("/admin").get(admin, getAllOrders);

// router.route("/:orderId").get(admin, getOrder).put(admin, updateOrder).delete(admin, deleteOrder);
export default router;
