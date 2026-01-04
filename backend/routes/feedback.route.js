import express from "express"
import { getFeedback, createFeedback, deleteFeedback, searchFeedback } from "../controllers/feedback.controller.js"

const router = express.Router();

router.get("/",getFeedback);
router.post("/send",createFeedback);
router.delete("/delete/:id",deleteFeedback);
router.get("/search/:slug", searchFeedback);

export default router;