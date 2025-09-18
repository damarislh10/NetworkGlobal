import type { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepo = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, birthDate, alias, email, password } = req.body;

    // Validación mínima
    if (
      !firstName ||
      !lastName ||
      !alias ||
      !email ||
      !password ||
      !birthDate
    ) {
      return res.status(404).json({
        statusCode: 404,
        message: "Solicitud inválida",
      });
    }

    const exists = await userRepo.findOne({ where: { email } });
    if (exists)
      return res
        .status(400)
        .json({ statusCode: 400, message: "Usuario ya registrado" });

    const hash = await bcrypt.hash(password, 10);

    const user = userRepo.create({
      firstName,
      lastName,
      birthDate: new Date(birthDate),
      alias,
      email,
      password: hash,
    });

    await userRepo.save(user);
    res.status(201).json({
      statusCode: 201,
      message: "Usuario creado",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ statusCode: 500, message: "Servicio no disponible" });
  }
};

const secret = process.env.JWT_SECRET;

export const login = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await userRepo.findOne({ where: { email } });
    if (!user)
      return res
        .status(401)
        .json({ statusCode: 401, message: "No autorizado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(401)
        .json({ statusCode: 401, message: "No autorizado" });

    if (!secret) {
      return res.status(500).json({ message: "JWT_SECRET no configurado" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ statusCode: 500, message: "Servicio no disponible" });
  }
};
