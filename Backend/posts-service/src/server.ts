import http from "http";
import { Server as IOServer } from "socket.io";
import dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./config/data-source";
import { ensureProcedures } from "./db/initProcedures";

dotenv.config();

const server = http.createServer(app);
const io = new IOServer(server, { cors: { origin: process.env.CORS_ORIGIN || "*" } });
app.set("io", io);

async function bootstrap() {
  await AppDataSource.initialize();
  await ensureProcedures();
  const port = Number(process.env.PORT || 3002);
  server.listen(port, () => console.log("Posts service on port", port));
}

bootstrap().catch((e) => {
  console.error("Bootstrap error:", e);
  process.exit(1);
});
