import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  const pepper = process.env.SECRET || "";
  return bcrypt.hash(password + pepper, 10);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const pepper = process.env.SECRET || "";
  return bcrypt.compare(password + pepper, hash);
};
