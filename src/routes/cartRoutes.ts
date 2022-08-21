import express from "express";
import { deleteCart, getCart, getCarts, updateCart } from "../controller/cartController";

const router = express.Router();

router.route("/").get(getCarts);

router.route("/:userId").get(getCart).put(updateCart).delete(deleteCart);

export default router;
