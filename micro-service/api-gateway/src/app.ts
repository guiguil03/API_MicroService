import express from "express";
import axios, { AxiosError } from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};

app.get("/time", async (req, res) => {
  try {
    console.log("Appel du service time-service");
    const response = await axios.get("http://localhost:3002");
    console.log("Réponse reçue du time-service", response.data);
    res.json(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        "Erreur Axios lors de l'appel du time-service:",
        error.message
      );
      if (error.response) {
        console.error("Détails de l'erreur Axios :", error.response.data);
        res.status(error.response.status).json({ error: error.response.data });
      } else {
        res.status(500).json({ error: "Erreur de connexion au time-service" });
      }
    } else {
      console.error("Erreur inattendue:", error);
      res
        .status(500)
        .json({ error: "Erreur inconnue lors de l'appel du time-service" });
    }
  }
});

app.get("/users", async (req, res) => {
  try {
    console.log("Appel du service user-service");
    const response = await axios.get("http://localhost:3001");
    console.log("Réponse reçue du user-service", response.data);
    res.json(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        "Erreur Axios lors de l'appel du user-service:",
        error.message
      );
      if (error.response) {
        console.error("Détails de l'erreur Axios :", error.response.data);
        res.status(error.response.status).json({ error: error.response.data });
      } else {
        res.status(500).json({ error: "Erreur de connexion au user-service" });
      }
    } else {
      console.error("Erreur inattendue:", error);
      res
        .status(500)
        .json({ error: "Erreur inconnue lors de l'appel du user-service" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway en écoute sur le port ${PORT}`);
});
