import "reflect-metadata";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();

// Body parsers (¡esto arregla req.body undefined!)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Swagger
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Service Auth - Documentation",
    swaggerOptions: {
      docExpansion: "list",
      tagsSorter: "alpha",
      operationsSorter: "method",
    },
  })
);

// Rutas
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

export default app;
