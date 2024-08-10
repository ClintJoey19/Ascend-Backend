import { Router } from "express";
import { getProjects, getProject } from "../controllers/project.controller.js";

const router = Router();

router.get("/projects", getProjects);

router.get("/project/:id", getProject);

export default router;
