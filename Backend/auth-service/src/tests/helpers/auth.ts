import request from "supertest";
import { fakeUser } from "./factory";
import app from "../../app";

export async function registerAndLogin() {
  const u = fakeUser();
  await request(app).post("/auth/register").send(u).expect(201);
  const res = await request(app).post("/auth/login").send({
    email: u.email,
    password: u.password,
  }).expect(200);
  return { token: res.body.token, user: u };
}
