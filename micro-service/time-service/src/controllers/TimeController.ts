import { Request, Response } from "express";
import TimerModel from "../models/TimerModel"; // Import du modèle Timer

// Soumission du temps de réaction
const submitReactionTime = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { reactionTime: time, userId: user_id } = req.body; // Utiliser l'ID de l'utilisateur à partir du corps de la requête

  if (!time || !user_id) {
    res.status(400).send({ error: "Time and user ID are required" });
    return;
  }
  try {
    // Enregistrement du temps de réaction dans la base de données
    const newTimer = new TimerModel({
      user_id,
      time,
    });
    await newTimer.save();

    res
      .status(201)
      .send({ message: "Reaction time submitted successfully", newTimer });
  } catch (error) {
    console.error("Error saving reaction time:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

// Récupération des temps de réaction par ID utilisateur
const getReactionTimesByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("front : id =", req.headers);
  const { id: user_id } = req.params; // Utiliser l'ID de l'utilisateur à partir des paramètres de l'URL

  if (!user_id) {
    res.status(400).send({ error: "User ID is required" });
    return;
  }

  try {
    const reactionTimes = await TimerModel.find({ user_id });

    if (!reactionTimes.length) {
      res.status(404).send({ error: "No reaction times found for this user" });
      return;
    }

    res.status(200).send({ user_id, reactionTimes });
  } catch (error) {
    console.error("Error retrieving reaction times:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

// Suppression de tous les temps de réaction par ID utilisateur
const deleteReactionTimesByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { user_id } = req.body; // Utiliser l'ID de l'utilisateur à partir du corps de la requête

  if (!user_id) {
    res.status(400).send({ error: "User ID is required" });
    return;
  }

  try {
    await TimerModel.deleteMany({ user_id });

    res
      .status(200)
      .send({ message: "All reaction times deleted successfully" });
  } catch (error) {
    console.error("Error deleting reaction times:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export default {
  submitReactionTime,
  getReactionTimesByUserId,
  deleteReactionTimesByUserId,
};
