import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";



const app = express();
export default app;

// Swagger
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Service Auth - Documentation",
    swaggerOptions: {
      docExpansion: "list",         // como en el pantallazo
      tagsSorter: "alpha",
      operationsSorter: "method",
    },
  })
);

// Rutas
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// DB
AppDataSource.initialize().then(() => {
  console.log("DB conectada");
  app.listen(3001, () => console.log("Auth service en puerto 3001"));
});
