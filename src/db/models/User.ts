import { Schema, model, models, Model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  role: "admin" | "user";
  displayName?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  displayName: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const User: Model<IUser> = (models.User as Model<IUser>) || model<IUser>("User", userSchema);
