import express from "express";
import { uploadImage } from "../controller/uploadController";
import { admin } from "../middleware/authMiddleware";
import uploadMiddleware from "../middleware/uploadMiddleware";

const router = express.Router();

router.route("/").post(admin, uploadMiddleware, uploadImage);

export default router;
