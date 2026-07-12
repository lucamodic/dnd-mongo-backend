import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";
import { User } from "../db/models/User";
import { hashPassword } from "../modules/auth/utils";

const USERS: { username: string; role: "dm" | "player"; displayName: string }[] = [
  { username: "vero", role: "player", displayName: "Vero" },
  { username: "gonza", role: "player", displayName: "Gonza" },
  { username: "theo", role: "player", displayName: "Theo" },
  { username: "ory", role: "player", displayName: "Ory" },
  { username: "insomnya", role: "dm", displayName: "Insomnya" },
];

const PASSWORD = "12345678";

async function run() {
  await connectDB();
  const password = await hashPassword(PASSWORD);

  const dm = await User.findOneAndUpdate(
    { username: "insomnya" },
    { $set: { role: "dm", displayName: "Insomnya", password }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true, new: true }
  );

  for (const u of USERS.filter((item) => item.username !== "insomnya")) {
    await User.updateOne(
      { username: u.username },
      { $set: { role: u.role, displayName: u.displayName, password, createdBy: dm._id }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    );
    console.log(`✓ ${u.username} (${u.role})`);
  }
  console.log("✓ insomnya (dm)");

  console.log(`\nListo. Todos con contraseña: ${PASSWORD}`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
