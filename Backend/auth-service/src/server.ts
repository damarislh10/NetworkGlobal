import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/data-source";

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("DB conectada");
    app.listen(PORT, () => {
      console.log(`Auth service en puerto ${PORT}`);
    });
  } catch (err) {
    console.error("Error inicializando BD:", err);
    process.exit(1);
  }
})();
