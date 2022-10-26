import express from "express";
import { handleRefreshToken, login, logout, register } from "../controller/authController";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/refresh").get(handleRefreshToken);
router.route("/logout").get(logout);

export default router;
