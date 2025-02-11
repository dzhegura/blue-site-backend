import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// Получить все проекты
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Ошибка загрузки проектов" });
  }
});

export default router;
