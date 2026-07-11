import jwt from "jsonwebtoken";

export interface TokenPayload {
  id: string;
  username: string;
  role: "admin" | "user";
}

export const signToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET || "";
  return jwt.sign(payload, secret, { expiresIn: "30d" });
};

export const verifyToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_SECRET || "";
  return jwt.verify(token, secret) as TokenPayload;
};
