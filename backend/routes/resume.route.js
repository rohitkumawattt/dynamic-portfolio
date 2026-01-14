import express from "express";
import { uploadResume, getResume } from "../controllers/resume.controller.js";
const router = express.Router();
import { upload } from "../middlerware/multer.js";

router.get("/",getResume);
router.post("/upload",upload.single("resume"),uploadResume);

export default router;
