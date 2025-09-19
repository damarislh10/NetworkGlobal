import "reflect-metadata";
import { AppDataSource } from "../config/data-source";

jest.setTimeout(30_000);

beforeAll(async () => {

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    const { ensureProcedures } = await import("../db/initProcedures");
    await ensureProcedures();
  }
});

beforeEach(async () => {
  const m = AppDataSource.manager;
  await m.query(`TRUNCATE TABLE likes RESTART IDENTITY CASCADE;`);
  await m.query(`TRUNCATE TABLE posts RESTART IDENTITY CASCADE;`);
});
afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});
afterAll(async () => {
  if (AppDataSource.isInitialized) await AppDataSource.destroy();
});
