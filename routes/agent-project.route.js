import express from "express";
import {
  getAgentProject,
  getAgentProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/agent-project.controller.js";

const router = express.Router();

router.get("/agent-projects", getAgentProjects);

router.get("/agent-projects/:id", getAgentProject);

router.post("/agent-projects", createProject);

router.put("/agent-projects/:id", updateProject);

router.delete("/agent-projects/:id", deleteProject);

export default router;
