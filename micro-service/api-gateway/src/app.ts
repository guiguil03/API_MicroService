// api-gateway/server.js
import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour analyser le corps des requêtes
app.use(express.json());

// Point de terminaison pour appeler le time-service
// Point de terminaison pour appeler le time-service
app.get("/time", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3002"); // Utilisez le nom du service Docker
    res.json(response.data);
  } catch (error) {
    console.error("Error calling time-service:");
    res.status(500).json({ error: "Erreur lors de l'appel du time-service" });
  }
});

// Point de terminaison pour appeler le user-service
app.get("/users", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3001"); // Utilisez le nom du service Docker
    res.json(response.data);
  } catch (error) {
    console.error("Error calling user-service:");
    res.status(500).json({ error: "Erreur lors de l'appel du user-service" });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
