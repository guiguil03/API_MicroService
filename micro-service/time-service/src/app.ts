import express, { Request, Response } from "express";
import connectDB from "./config/db";
import TimeRouter from "../src/routes/TimeRoute";
import cors from "cors";
const app = express();
const port = process.env.PORT2 || 3002;

// Middleware pour parser le JSON
app.use(cors());
app.use(express.json());
connectDB();
// Route simple pour tester l'API
app.use(TimeRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World ma belle!");
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
