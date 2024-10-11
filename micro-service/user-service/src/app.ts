import express, { Request, Response } from "express";
import connectDB from "./config/db";
import userController from "./controllers/UserController";

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());
connectDB();
// Route simple pour tester l'API
const router = express.Router();
router.get("/login", userController.login);
router.get("/register", userController.register);
router.get("/delete", userController.del);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
