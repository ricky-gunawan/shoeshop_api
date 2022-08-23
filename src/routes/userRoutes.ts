import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser, userLogin } from "../controller/userController";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(admin, getUsers).post(createUser);

router.route("/:userId").get(admin, getUser).put(protect, updateUser).delete(admin, deleteUser);

router.route("/login").post(userLogin);

export default router;
