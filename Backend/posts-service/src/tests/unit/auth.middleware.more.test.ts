import type { Request, Response, NextFunction } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

const mockRes = () => {
  const res = {} as Response & any;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("authMiddleware branches", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    process.env.JWT_SECRET = "supersecreto";
  });

  it("401 cuando no hay header Authorization", () => {
    const req = { headers: {} } as unknown as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });


  it("401 cuando jwt.verify lanza error (token inválido)", () => {
    (jwt.verify as jest.Mock).mockImplementation(() => { throw new Error("bad"); });

    const req = { headers: { authorization: "Bearer x.y.z" } } as unknown as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("next() cuando el token es válido", () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: "u1", email: "a@a.com" });

    const req = { headers: { authorization: "Bearer x.y.z" } } as unknown as Request & any;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect((req as any).user).toEqual({ id: "u1", email: "a@a.com" });
  });
});
