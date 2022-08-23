import express from "express";
import { createOrder, deleteOrder, getAllOrders, getOrder, getUserOrders, updateOrder } from "../controller/orderController";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getUserOrders).post(protect, createOrder);

router.route("/admin").get(admin, getAllOrders);

router.route("/:orderId").get(admin, getOrder).put(admin, updateOrder).delete(admin, deleteOrder);

export default router;
