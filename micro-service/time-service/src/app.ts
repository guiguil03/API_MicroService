import express, { Request, Response } from "express";
import connectDB from "./config/db";
const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());
connectDB();
// Route simple pour tester l'API
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
