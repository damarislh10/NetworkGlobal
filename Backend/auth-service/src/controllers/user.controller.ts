import type { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const repo = AppDataSource.getRepository(User);
    const id = (req as any).user.id as string;

    const me = await repo.findOne({
      where: { id },
      select: ["id", "firstName", "lastName", "birthDate", "alias", "email"],
    });

    if (!me) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "No encontrado" });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Procesado exitosamente",
      data: me,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ statusCode: 500, message: "Servicio no disponible" });
  }
};
