import "reflect-metadata";
import path from "path";
import dotenv from "dotenv";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";

dotenv.config({ path: path.resolve(__dirname, "../../.env.test") });

jest.setTimeout(30_000);

beforeAll(async () => {
  if (AppDataSource.isInitialized) await AppDataSource.destroy();
  AppDataSource.setOptions({
    database: process.env.DB_NAME,
    synchronize: true,
    dropSchema: true,   // ← limpio en cada corrida
    entities: [User],
  });
  await AppDataSource.initialize();
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

afterAll(async () => {
  if (AppDataSource.isInitialized) await AppDataSource.destroy();
});
