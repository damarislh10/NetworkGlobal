import { authMiddleware } from "../../middleware/auth.middleware";
import type { Request, Response, NextFunction } from "express";

const mockRes = () => {
  const res = {} as Response;
  (res.status as any) = jest.fn().mockReturnValue(res);
  (res.json as any) = jest.fn().mockReturnValue(res);
  return res;
};

describe("authMiddleware", () => {
  it("401 cuando no hay token", () => {
    const req = { headers: {} } as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;
    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});
