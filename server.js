import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Подключено к MongoDB"))
  .catch((error) => {
    console.error("Ошибка подключения к MongoDB:", error);
    process.exit(1);
  });

const app = express();
app.use(cors());
app.use(express.json());

// API маршруты
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);

// **Маршрут для отправки e-mail**
app.post("/api/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Мой e-mail
      pass: process.env.EMAIL_PASS, // Пароль приложения Gmail
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "dzhegura@gmail.com", // Получатель
    subject: `Новое сообщение от ${name}`,
    text: `Имя: ${name}
E-mail: ${email}
Телефон: ${phone || "Не указан"}
Сообщение:
${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email отправлен успешно!" });
  } catch (error) {
    console.error("Ошибка отправки e-mail:", error);
    res.status(500).json({ success: false, message: "Ошибка отправки email." });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
