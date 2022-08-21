import express from "express";
import { createOrder, deleteOrder, getAllOrders, getOrder, getUserOrders, updateOrder } from "../controller/orderController";

const router = express.Router();

router.route("/admin").get(getAllOrders);

router.route("/admin/:orderId").get(getOrder).put(updateOrder).delete(deleteOrder);

router.route("/:userId").get(getUserOrders).post(createOrder);

export default router;
