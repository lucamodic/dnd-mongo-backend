import "dotenv/config";
import app from "./app";

// En Vercel se exporta el app como handler serverless.
// En local, si ejecutamos este archivo directamente, levantamos el servidor.
if (require.main === module) {
  const port = Number(process.env.PORT) || 4000;
  app.listen(port, () => console.log(`🐉 dnd-mongo-backend en http://localhost:${port}`));
}

export default app;
