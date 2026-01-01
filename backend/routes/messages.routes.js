import express from "express"
import { addMessage, getMessages, getMessageById } from "../controllers/messages.controller.js";
const router = express.Router();


router.post("/send",addMessage);
router.get("/",getMessages);
router.get("/:slug",getMessageById);
export default router;
