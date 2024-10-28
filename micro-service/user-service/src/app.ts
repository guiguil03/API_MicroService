import express, { Request, Response } from "express";
import connectDB from "./config/db";
import userController from "./controllers/UserController";
import UserRouter from "../src/routes/UserRoute";
import cors from "cors";
const app = express();
const port = process.env.PORT1 || 3001;

// Middleware pour parser le JSON
app.use(cors());
app.use(express.json());
connectDB();
// Route simple pour tester l'API
app.use("/users", UserRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
