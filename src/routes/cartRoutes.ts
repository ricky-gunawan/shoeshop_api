import express from "express";
import { deleteCart, getCart, getCarts, updateCart } from "../controller/cartController";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").put(protect, updateCart).get(admin, getCarts);

router.route("/:userId").get(protect, getCart).delete(admin, deleteCart);

export default router;
