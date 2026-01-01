import express from 'express';
const router = express.Router();
import { createSkills, getSkills, deleteSkills } from '../controllers/skills.controller.js';
import { protect } from '../middlerware/user.middleware.js';

router.post("/create",protect,createSkills);
router.get("/",getSkills);
router.delete("/delete/:id",protect,deleteSkills);

export default router;
