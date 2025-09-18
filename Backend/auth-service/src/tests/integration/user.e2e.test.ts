import request from "supertest";
import { registerAndLogin } from "../helpers/auth";
import app from "../../app";

describe("User E2E", () => {
  it("GET /user/profile -> 200 con token", async () => {
    const { token, user } = await registerAndLogin();
    const res = await request(app)
      .get("/user/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      statusCode: 200,
      message: "Procesado exitosamente",
    });
    expect(res.body.data).toHaveProperty("email", user.email);
  });

  it("GET /user/profile -> 401 sin token", async () => {
    await request(app).get("/user/profile").expect(401);
  });
});
