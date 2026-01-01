import express from "express";
import { getUserProfile,uploadAvatar, updateAvatar, updateAbout, updateSocialMediaLinks } from "../controllers/userProfile.controller.js";
import { protect } from "../middlerware/user.middleware.js";
import { upload } from "../middlerware/multer.js";
const router = express.Router();

router.post("/avatar", protect, upload.single("avatar"), uploadAvatar);
router.patch("/avatar", protect, upload.single("avatar"), updateAvatar);
router.patch("/about", protect, updateAbout);
router.patch("/social-media-links", protect, updateSocialMediaLinks);
router.get("/:userId", getUserProfile);

export default router;