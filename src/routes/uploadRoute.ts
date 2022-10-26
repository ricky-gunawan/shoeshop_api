import express from "express";
import roleList from "../config/roleList";
import { uploadImage } from "../controller/uploadController";
import uploadMiddleware from "../middleware/uploadMiddleware";
import verifyRoles from "../middleware/verifyRoles";

const router = express.Router();

router.route("/").post(verifyRoles(roleList.customer, roleList.admin), uploadMiddleware, uploadImage);

// router.route("/").post(admin, uploadMiddleware, uploadImage);
export default router;
