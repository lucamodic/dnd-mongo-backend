import { User } from "../../db/models/User";
import { HttpError } from "../../utils/response";
import { signToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "./utils";

const normalizeRole = (role: string) => (role === "admin" ? "dm" : role === "user" ? "player" : role);

const publicUser = (user: any) => ({
  id: String(user._id),
  username: user.username,
  displayName: user.displayName || user.username,
  role: normalizeRole(user.role),
  createdBy: user.createdBy ? String(user.createdBy) : undefined,
});

export class AuthService {
  static async login(username: string, password: string) {
    if (!username || !password) {
      throw new HttpError(400, "Usuario y contraseña son obligatorios");
    }

    const user = await User.findOne({ username: username.toLowerCase().trim() });
    if (!user) throw new HttpError(401, "Credenciales inválidas");

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new HttpError(401, "Credenciales inválidas");

    const token = signToken({
      id: String(user._id),
      username: user.username,
      role: user.role,
    });

    return {
      token,
      user: publicUser(user),
    };
  }

  static async me(id: string) {
    const user = await User.findById(id).select("-password");
    if (!user) throw new HttpError(404, "Usuario no encontrado");
    return publicUser(user);
  }

  static async createPlayer(dmId: string, body: { username?: string; password?: string; displayName?: string }) {
    const username = body.username?.toLowerCase().trim();
    const password = body.password || "";
    if (!username || !password) throw new HttpError(400, "Usuario y contraseña son obligatorios");
    if (password.length < 4) throw new HttpError(400, "La contraseña debe tener al menos 4 caracteres");

    const exists = await User.findOne({ username });
    if (exists) throw new HttpError(409, "Ya existe un usuario con ese nombre");

    const user = await User.create({
      username,
      password: await hashPassword(password),
      displayName: body.displayName?.trim() || username,
      role: "player",
      createdBy: dmId,
    });
    return publicUser(user);
  }
}
