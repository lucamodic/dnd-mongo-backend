import { Schema, model, models, Model, Document, Types } from "mongoose";

export type UserRole = "dm" | "player" | "admin" | "user";

export interface IUser extends Document {
  username: string;
  password: string;
  role: UserRole;
  displayName?: string;
  createdBy?: Types.ObjectId;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["dm", "player", "admin", "user"], default: "player" },
  displayName: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export const User: Model<IUser> = (models.User as Model<IUser>) || model<IUser>("User", userSchema);
