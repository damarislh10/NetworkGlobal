import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ statusCode: 401, message: "No autorizado" });

  const token = auth.split(" ")[1];
  if (!token) return res.status(401).json({ statusCode: 401, message: "No autorizado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "changeme");
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ statusCode: 401, message: "No autorizado" });
  }
}
