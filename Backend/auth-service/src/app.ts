import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import cors from 'cors';



const app = express();

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
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rutas
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// DB
AppDataSource.initialize().then(() => {
  console.log("DB conectada");
  app.listen(3001, () => console.log("Auth service en puerto 3001"));
});
export default app;
