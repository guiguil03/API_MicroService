import { Schema, model, Document, Types } from "mongoose";
import UserModel from "../../../user-service/src/models/UserModel";

interface Timer extends Document {
  user_id: Types.ObjectId;
  time: number;
}

const TimerSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Clé étrangère
  time: { type: Number, required: true },
});

// Créez le modèle avec le schéma mis à jour
const TimerModel = model<Timer>("Timer", TimerSchema);

export default TimerModel;
