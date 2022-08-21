import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser, userLogin } from "../controller/userController";

const router = express.Router();

router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

router.route("/login").post(userLogin);

export default router;
