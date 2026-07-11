import express from "express";
import cors from "cors";
import routes from "./modules";
import { connectDB } from "./db/connect";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" })); // 5mb para poder subir el JSON de resúmenes

// Aseguramos la conexión a Mongo antes de cada request (cacheada en serverless).
app.use(async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (e) {
    res.status(500).json({ error: "No se pudo conectar a la base de datos" });
  }
});

app.get("/", (_req, res) => res.json({ ok: true, name: "dnd-mongo-backend" }));
app.get("/health", (_req, res) => res.json({ ok: true }));

app.use(routes);

app.use((_req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

export default app;
