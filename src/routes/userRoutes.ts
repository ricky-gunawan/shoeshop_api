import express from "express";
import roleList from "../config/roleList";
import { deleteUser, getUser, getUsers, updateUser } from "../controller/userController";
import verifyRoles from "../middleware/verifyRoles";

const router = express.Router();

router.route("/").get(verifyRoles(roleList.customer, roleList.admin), getUsers);

router.route("/:userId").get(verifyRoles(roleList.customer, roleList.admin), getUser).put(verifyRoles(roleList.customer), updateUser).delete(verifyRoles(roleList.customer, roleList.admin), deleteUser);

// router.route("/").get(admin, getUsers);

// router.route("/:userId").get(admin, getUser).put(protect, updateUser).delete(admin, deleteUser);
export default router;
