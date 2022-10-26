import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controller/admin/user";

const adminUserRoutes = express.Router();

adminUserRoutes.route("/").get(getUsers);

adminUserRoutes.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

export default adminUserRoutes;
