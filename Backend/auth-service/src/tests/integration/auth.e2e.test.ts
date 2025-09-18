import request from "supertest";
import { fakeUser } from "../helpers/factory";
import app from "../../app";

describe("Auth E2E", () => {
  it("POST /auth/register -> 201", async () => {
    const u = fakeUser();
    const res = await request(app).post("/auth/register").send(u);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ statusCode: 201, message: "Usuario creado" });
  });

  it("POST /auth/login -> 200 token", async () => {
    const u = fakeUser();
    await request(app).post("/auth/register").send(u).expect(201);

    const res = await request(app)
      .post("/auth/login")
      .send({ email: u.email, password: u.password });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("POST /auth/login -> 401 con password incorrecto", async () => {
    const u = fakeUser();
    await request(app).post("/auth/register").send(u).expect(201);

    const res = await request(app)
      .post("/auth/login")
      .send({ email: u.email, password: "mala" });

    expect(res.status).toBe(401);
    expect(res.body).toMatchObject({ statusCode: 401, message: "No autorizado" });
  });
});
