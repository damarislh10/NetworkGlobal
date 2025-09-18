import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getProfile } from "../controllers/user.controller";
import express from 'express';

const router = Router();
router.use(express.json());

/**
 * @openapi
 * /user/profile:
 *   get:
 *     summary: Perfil del usuario autenticado
 *     tags: [Users]
 *     responses:
 *       '200': { $ref: '#/components/responses/Profile200' }
 *       '401': { $ref: '#/components/responses/Unauthorized401' }
 *       '404': { $ref: '#/components/responses/NotFound404' }
 *       '500': { $ref: '#/components/responses/Internal500' }
 */
router.get("/profile", authMiddleware, getProfile);


export default router;
