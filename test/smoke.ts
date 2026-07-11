import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "http";

async function main() {
  const mem = await MongoMemoryServer.create();
  process.env.MONGO_URI = mem.getUri("dnd");
  process.env.JWT_SECRET = "test-secret";
  process.env.SECRET = "";

  // Import after env is set
  const app = (await import("../src/app")).default;
  const { User } = await import("../src/db/models/User");
  const { Race } = await import("../src/db/models/Race");
  const { Class } = await import("../src/db/models/Class");
  const { hashPassword } = await import("../src/modules/auth/utils");

  // Seed one admin + one player directly
  const password = await hashPassword("12345678");
  await (await import("../src/db/connect")).connectDB();
  await User.create({ username: "insomnya", role: "admin", displayName: "Insomnya", password });
  await User.create({ username: "vero", role: "user", displayName: "Vero", password });

  // Seed one race + one class (skip network import)
  const race = await Race.create({ index: "human", name: "Human", speed: 30, size: "Medium", abilityBonuses: [{ ability: "con", bonus: 1 }], traits: [] });
  const cls = await Class.create({ index: "fighter", name: "Fighter", hitDie: 10, color: "#888", spellcasting: false, savingThrows: [], primaryAbility: "STR" });

  const server = app.listen(4555);
  const base = "http://localhost:4555";

  const call = (method: string, path: string, body?: any, token?: string) =>
    new Promise<{ status: number; json: any }>((resolve, reject) => {
      const data = body ? JSON.stringify(body) : undefined;
      const req = request.request(
        base + path,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(data ? { "Content-Length": Buffer.byteLength(data) } : {}),
          },
        },
        (res) => {
          let raw = "";
          res.on("data", (c) => (raw += c));
          res.on("end", () => resolve({ status: res.statusCode || 0, json: raw ? JSON.parse(raw) : null }));
        }
      );
      req.on("error", reject);
      if (data) req.write(data);
      req.end();
    });

  const assert = (cond: boolean, msg: string) => {
    if (!cond) throw new Error("FAIL: " + msg);
    console.log("  ✓ " + msg);
  };

  // 1. Login
  const badLogin = await call("POST", "/auth/login", { username: "vero", password: "wrong" });
  assert(badLogin.status === 401, "login con pass mala -> 401");

  const login = await call("POST", "/auth/login", { username: "vero", password: "12345678" });
  assert(login.status === 200 && !!login.json.data.token, "login vero ok");
  const veroToken = login.json.data.token;

  const adminLogin = await call("POST", "/auth/login", { username: "insomnya", password: "12345678" });
  const adminToken = adminLogin.json.data.token;
  assert(adminLogin.json.data.user.role === "admin", "insomnya es admin");

  // 2. Auth required
  const noAuth = await call("GET", "/characters");
  assert(noAuth.status === 401, "GET /characters sin token -> 401");

  // 3. Create character lvl1 (pasamos stats explícitas para que la vida sea determinística)
  const flatScores = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
  const created = await call("POST", "/characters", { name: "Aragorn", raceId: String(race._id), classId: String(cls._id), abilityScores: flatScores }, veroToken);
  assert(created.status === 201, "crear personaje -> 201");
  const char = created.json.data;
  // human con +1 con => con 11, mod 0; hitDie 10 => maxHp 10
  assert(char.maxHp === 10 && char.currentHp === 10, `maxHp = hitDie + modCON (=10), got ${char.maxHp}`);
  assert(char.level === 1, "empieza nivel 1");

  // 4. Level up with rolled=6
  const lvlup = await call("POST", `/characters/${char._id}/level-up`, { rolled: 6 }, veroToken);
  assert(lvlup.json.data.character.level === 2, "sube a nivel 2");
  assert(lvlup.json.data.character.maxHp === 16, `maxHp 10 + 6 = 16, got ${lvlup.json.data.character.maxHp}`);

  // 5. Tracker: player joins, admin adds monster, non-admin cannot add monster
  const join = await call("POST", "/tracker/join", { characterId: char._id, initiative: 15 }, veroToken);
  assert(join.status === 200 && join.json.data.participants.length === 1, "vero se suma al tracker");

  const playerAddsMonster = await call("POST", "/tracker/participants", { name: "Goblin", hp: 7, ac: 15 }, veroToken);
  assert(playerAddsMonster.status === 403, "jugador NO puede agregar bicho -> 403");

  const adminAddsMonster = await call("POST", "/tracker/participants", { name: "Goblin", hp: 7, ac: 15, initiative: 12 }, adminToken);
  assert(adminAddsMonster.json.data.participants.length === 2, "admin agrega bicho");

  const sorted = await call("POST", "/tracker/sort", {}, adminToken);
  assert(sorted.json.data.participants[0].name === "Aragorn", "sort por iniciativa desc (Aragorn 15 primero)");

  const next = await call("POST", "/tracker/next", {}, adminToken);
  assert(next.json.data.activeIndex === 1, "next avanza el turno");

  const playerDeletesMonster = await call("DELETE", `/tracker/participants/${sorted.json.data.participants[1]._id}`, undefined, veroToken);
  assert(playerDeletesMonster.status === 403, "jugador NO puede borrar el bicho -> 403");

  console.log("\n✅ TODOS LOS SMOKE TESTS PASARON");
  server.close();
  await mongoose.disconnect();
  await mem.stop();
  process.exit(0);
}

main().catch((e) => {
  console.error("\n❌", e.message || e);
  process.exit(1);
});
