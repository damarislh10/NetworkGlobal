import "reflect-metadata";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";

jest.setTimeout(30_000);

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

beforeEach(async () => {
  try {
    const repo = AppDataSource.getRepository(User);
    await repo.clear(); // <-- en vez de: await repo.delete({})
  } catch (e: any) {

    if (e?.code !== "42P01") throw e;
  }
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});
