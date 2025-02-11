import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Получить все контакты
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Ошибка загрузки контактов" });
  }
});

export default router;
