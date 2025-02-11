import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Подключено к MongoDB"))
  .catch((error) => {
    console.error("Ошибка подключения к MongoDB:", error.message);
    process.exit(1);
  });

const app = express();
app.use(cors());
app.use(express.json());

// API маршруты
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);

// Обработка ошибок (middleware)
app.use((err, req, res, next) => {
  console.error("Ошибка сервера:", err.message);
  res.status(500).json({ message: "Внутренняя ошибка сервера" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
