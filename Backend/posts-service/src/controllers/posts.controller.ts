import type { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";

export const createPost = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id as string;
    const { message } = req.body || {};
    if (!message || !String(message).trim()) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Datos incompletos" });
    }

    const r = await AppDataSource.manager.query(
      `SELECT * FROM public.sp_create_post($1, $2)`,
      [userId, message]
    );
    const created = r?.[0];
    return res.status(201).json({
      statusCode: 201,
      message: "Post creado",
      data: {
        id: created?.id,
        userId: created?.user_id,
        message: created?.message,
        createdAt: created?.created_at,
      },
    });
  } catch (e) {
    console.error("createPost error:", e);
    return res
      .status(500)
      .json({ statusCode: 500, message: "Servicio no disponible" });
  }
};

export const listPosts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id as string;
    if (!userId) {
      return res
        .status(401)
        .json({ statusCode: 401, message: "No autorizado " });
    }

    const rows = await AppDataSource.manager.query(
      `
      SELECT
        p.id,
        p.user_id AS "userId",
        p.message,
        p.created_at AS "createdAt",
        COALESCE(lc.cnt, 0)::int AS "likes",
        CASE WHEN lm.user_id IS NULL THEN false ELSE true END AS "likedByMe"
      FROM posts p
      LEFT JOIN (
        SELECT post_id, COUNT(*)::int AS cnt
        FROM likes
        GROUP BY post_id
      ) lc ON lc.post_id = p.id
      LEFT JOIN likes lm ON lm.post_id = p.id AND lm.user_id = $1
      ORDER BY p.created_at DESC
      LIMIT 50;
      `,
      [userId]
    );

    return res.status(200).json({ statusCode: 200, message: "OK", data: rows });
  } catch (e) {
    console.error("listPosts error:", e);
    return res
      .status(500)
      .json({ statusCode: 500, message: "Servicio no disponible" });
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id as string;
    const postId = req.params.id;
    if (!postId)
      return res
        .status(400)
        .json({ statusCode: 400, message: "postId requerido" });

    const r = await AppDataSource.manager.query(
      `SELECT sp_increment_like($1, $2) AS likes`,
      [postId, userId]
    );
    const likes = r?.[0]?.likes ?? 0;

    const io = req.app.get("io") as import("socket.io").Server;
    io?.emit("post:like", { postId, likes });

    return res
      .status(200)
      .json({ statusCode: 200, message: "OK", data: { postId, likes } });
  } catch (e) {
    console.error("likePost error:", e);
    return res
      .status(500)
      .json({ statusCode: 500, message: "Servicio no disponible" });
  }
};
