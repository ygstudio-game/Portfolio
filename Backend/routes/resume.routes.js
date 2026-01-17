import express from "express";
import { downloadResume } from "../controllers/resume.controller.js";

const router = express.Router();

// GET /api/resume
router.get("/resume", downloadResume);

export default router;