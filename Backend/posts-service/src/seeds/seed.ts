import "reflect-metadata";
import dotenv from "dotenv";
import { AppDataSource } from "../config/data-source";

dotenv.config();

async function run() {
  await AppDataSource.initialize();

  // Asegura procedimientos
  const { ensureProcedures } = await import("../db/initProcedures");
  await ensureProcedures();

  // Crea un post por cada usuario (si existe tabla users de auth-service)
  const users = await AppDataSource.manager.query(`SELECT id, email FROM users LIMIT 50;`).catch(() => []);
  for (const u of users) {
    await AppDataSource.manager.query(`SELECT * FROM sp_create_post($1,$2)`, [u.id, `Hola, soy ${u.email}`]);
  }

  console.log(`Seed completado: ${users.length} posts creados.`);
  await AppDataSource.destroy();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
