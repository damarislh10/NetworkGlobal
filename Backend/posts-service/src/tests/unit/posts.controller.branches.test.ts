import type { Request, Response } from "express";
import { createPost, listPosts, likePost } from "../../controllers/posts.controller";
import { AppDataSource } from "../../config/data-source";

const mockRes = () => {
  const res = {} as Response & any;
  res.status = jest.fn().mockReturnValue(res);
  res.json  = jest.fn().mockReturnValue(res);
  // mocko io para likePost
  const io = { emit: jest.fn(), to: jest.fn().mockReturnThis() } as any;
  res.app = { get: jest.fn().mockReturnValue(io) } as any;
  return res;
};

describe("posts.controller branches", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  // --- createPost
  it("createPost 400 si falta message (Datos incompletos)", async () => {
    const req = { body: {}, user: { id: "u1" } } as unknown as Request & any;
    const res = mockRes();

    await createPost(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 400, message: "Datos incompletos" })
    );
  });


});

  // --- listPosts
  it("listPosts 401 si no hay user en req", async () => {
    const req = {} as unknown as Request & any;
    const res = mockRes();

    await listPosts(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 401 })
    );
  });


  it("listPosts 200 devuelve array", async () => {
    jest.spyOn(AppDataSource.manager, "query").mockResolvedValue([
      { id: "p1", userId: "u2", message: "hola", createdAt: "2025-01-01T00:00:00Z", likes: 1, likedByMe: false }
    ]);

    const req = { user: { id: "u1" } } as unknown as Request & any;
    const res = mockRes();

    await listPosts(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.any(Array) })
    );
  });

  // --- likePost
  it("likePost 400 si falta id en params", async () => {
    const req = { params: {}, user: { id: "u1" } } as unknown as Request & any;
    const res = mockRes();

    await likePost(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 400, message: "postId requerido" })
    );
  });


  it("likePost 200 y emite socket", async () => {
    jest.spyOn(AppDataSource.manager, "query").mockResolvedValue([{ likes: 3 }]);

    const res = mockRes();
    const req = { params: { id: "p1" }, user: { id: "u1" }, app: res.app } as unknown as Request & any;

    await likePost(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ data: { postId: "p1", likes: 3 } })
    );
    // el io.emit haya sido llamado
    const io = res.app.get();
    expect(io.emit).toHaveBeenCalledWith("post:like", { postId: "p1", likes: 3 });
  });

