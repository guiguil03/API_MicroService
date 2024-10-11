import { Schema, model, Document } from "mongoose";

interface User extends Document {
  email: string;
  password: string;
  role: Boolean;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Boolean, required: true },
});

UserSchema.methods.isAdmin = function () {
  return this.role == 1; // Si role est true (1), alors c'est un admin
};

const UserModel = model<User>("User", UserSchema);

export default UserModel;
