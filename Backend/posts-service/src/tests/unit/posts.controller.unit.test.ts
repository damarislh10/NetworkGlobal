import { createPost } from "../../controllers/posts.controller";
import type { Request, Response } from "express";

function mockRes() {
  const res = {} as Response;
  (res.status as any) = jest.fn().mockReturnValue(res);
  (res.json as any) = jest.fn().mockReturnValue(res);
  return res;
}

describe("createPost validation", () => {
  it("400 si falta message", async () => {
    const req = { body: {}, user: { id: "u1" } } as any as Request;
    const res = mockRes();
    await createPost(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
