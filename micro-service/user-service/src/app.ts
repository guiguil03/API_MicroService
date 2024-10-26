import express, { Request, Response } from "express";
import connectDB from "./config/db";
import userController from "./controllers/UserController";
import UserRouter from "../src/routes/UserRoute";
const app = express();
const port = process.env.PORT || 3001;

// Middleware pour parser le JSON
app.use(express.json());
connectDB();
// Route simple pour tester l'API
app.use(UserRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
