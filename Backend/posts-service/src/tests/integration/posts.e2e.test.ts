import request from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../config/data-source";
import { rand } from "../helpers/factory";

const JWT_SECRET = process.env.JWT_SECRET || "supersecreto_test";

async function createUser(email: string, alias: string) {
  await AppDataSource.manager.query(
    `CREATE EXTENSION IF NOT EXISTS pgcrypto;`
  );
  await AppDataSource.manager.query(
    `CREATE TABLE IF NOT EXISTS users(
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      firstName text, lastName text, birthDate date, alias text UNIQUE, email text UNIQUE, password text
    );`
  );
  await AppDataSource.manager.query(
    `INSERT INTO users(id, firstName, lastName, birthDate, alias, email, password)
     VALUES (gen_random_uuid(), 'Test', 'User', '1990-01-01', $1, $2, 'x')
     ON CONFLICT (email) DO NOTHING;`,
    [alias, email]
  );
  const row = await AppDataSource.manager.query(`SELECT id FROM users WHERE email=$1`, [email]);
  return row[0].id as string;
}

describe("Posts Service E2E", () => {
  it("crear, listar y like/unlike", async () => {
    const uAEmail = `a${rand()}@test.com`;
    const uAId = await createUser(uAEmail, `userA${rand()}`);
    const tokenA = jwt.sign({ id: uAId, email: uAEmail }, JWT_SECRET, { expiresIn: "1h" });

    const uBEmail = `b${rand()}@test.com`;
    const uBId = await createUser(uBEmail, `userB${rand()}`);
    const tokenB = jwt.sign({ id: uBId, email: uBEmail }, JWT_SECRET, { expiresIn: "1h" });

    // A crea post
    const created = await request(app).post("/posts").set("Authorization", `Bearer ${tokenA}`).send({ message: "Hola mundo" });
    expect(created.status).toBe(201);
    const postId = created.body?.data?.id;

    // B lista
    const list = await request(app).get("/posts").set("Authorization", `Bearer ${tokenB}`);
    expect(list.status).toBe(200);
    expect(list.body.data.find((p: any) => p.id === postId)).toBeTruthy();

    // B like
    const like = await request(app).post(`/posts/${postId}/like`).set("Authorization", `Bearer ${tokenB}`);
    expect(like.status).toBe(200);
    expect(like.body?.data?.likes).toBe(1);

    // B unlike (toggle)
    const unlike = await request(app).post(`/posts/${postId}/like`).set("Authorization", `Bearer ${tokenB}`);
    expect(unlike.status).toBe(200);
    expect(unlike.body?.data?.likes).toBe(0);
  });
});
