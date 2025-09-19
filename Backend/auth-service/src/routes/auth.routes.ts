import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import express from 'express';

const router = Router();
router.use(express.json());

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     security: []   # público
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/RegisterRequest' }
 *     responses:
 *       '201': { $ref: '#/components/responses/Register201' }
 *       '400': { $ref: '#/components/responses/BadRequest400' }
 *       '500': { $ref: '#/components/responses/Internal500' }
 */
router.post("/register", register);
/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     security: []   # público
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LoginRequest' }
 *     responses:
 *       '200': { $ref: '#/components/responses/Login200' }
 *       '401': { $ref: '#/components/responses/Unauthorized401' }
 *       '500': { $ref: '#/components/responses/Internal500' }
 */
router.post("/login", login);

export default router;
