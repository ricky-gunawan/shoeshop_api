import express from "express";
import { updateUser } from "../controller/customer/user";

const userRoutes = express.Router();

userRoutes.route("/").put(updateUser);

export default userRoutes;
