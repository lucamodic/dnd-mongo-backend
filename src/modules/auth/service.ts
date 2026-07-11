import { User } from "../../db/models/User";
import { HttpError } from "../../utils/response";
import { signToken } from "../../utils/jwt";
import { comparePassword } from "./utils";

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
      user: {
        id: String(user._id),
        username: user.username,
        displayName: user.displayName || user.username,
        role: user.role,
      },
    };
  }

  static async me(id: string) {
    const user = await User.findById(id).select("-password");
    if (!user) throw new HttpError(404, "Usuario no encontrado");
    return {
      id: String(user._id),
      username: user.username,
      displayName: user.displayName || user.username,
      role: user.role,
    };
  }
}
