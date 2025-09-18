import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createPost, listPosts, likePost } from "../controllers/posts.controller";
import express from 'express';

/**
 * @openapi
 * /posts:
 *   get:
 *     summary: Lista posts de otros usuarios
 *     tags: [Posts]
 *     responses:
 *       '200': { $ref: '#/components/responses/Posts200' }
 *       '401': { $ref: '#/components/responses/Unauthorized401' }
 *       '500': { $ref: '#/components/responses/Internal500' }
 *   post:
 *     summary: Crear post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreatePostRequest' }
 *           examples:
 *             ejemplo:
 *               value: { "message": "Hola mundo" }
 *     responses:
 *       '201': { $ref: '#/components/responses/PostCreated201' }
 *       '400': { $ref: '#/components/responses/BadRequest400' }
 *       '401': { $ref: '#/components/responses/Unauthorized401' }
 *       '500': { $ref: '#/components/responses/Internal500' }
 *
 * /posts/{id}/like:
 *   post:
 *     summary: Like / Toggle a un post
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *         description: ID del post (posts.id)
 *     responses:
 *       '200': { $ref: '#/components/responses/Like200' }
 *       '400': { $ref: '#/components/responses/BadRequest400' }
 *       '401': { $ref: '#/components/responses/Unauthorized401' }
 *       '500': { $ref: '#/components/responses/Internal500' }
 */
const router = Router();
router.use(express.json());

router.get("/posts", authMiddleware, listPosts);
router.post("/posts", authMiddleware, createPost);
router.post("/posts/:id/like", authMiddleware, likePost);

export default router;
