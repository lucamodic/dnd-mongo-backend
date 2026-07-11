import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";
import { User } from "../db/models/User";
import { hashPassword } from "../modules/auth/utils";

const USERS: { username: string; role: "admin" | "user"; displayName: string }[] = [
  { username: "vero", role: "user", displayName: "Vero" },
  { username: "gonza", role: "user", displayName: "Gonza" },
  { username: "theo", role: "user", displayName: "Theo" },
  { username: "ory", role: "user", displayName: "Ory" },
  { username: "insomnya", role: "admin", displayName: "Insomnya" },
];

const PASSWORD = "12345678";

async function run() {
  await connectDB();
  const password = await hashPassword(PASSWORD);

  for (const u of USERS) {
    await User.updateOne(
      { username: u.username },
      { $set: { role: u.role, displayName: u.displayName, password }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    );
    console.log(`✓ ${u.username} (${u.role})`);
  }

  console.log(`\nListo. Todos con contraseña: ${PASSWORD}`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
