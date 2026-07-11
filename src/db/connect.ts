import mongoose from "mongoose";

/**
 * Conexión a MongoDB cacheada entre invocaciones.
 * En Vercel (serverless) cada request puede reusar el mismo proceso, así que
 * guardamos la promesa de conexión en `global` para no abrir una conexión nueva
 * en cada llamada (lo que agotaría el pool de Atlas).
 */
declare global {
  // eslint-disable-next-line no-var
  var _mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const cached = global._mongoose || { conn: null, promise: null };
global._mongoose = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("Falta la variable de entorno MONGO_URI");

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { bufferCommands: false }).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
