import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";

(async () => {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(User);

  const users = [
    {
      firstName: "Ana",
      lastName: "Gómez",
      alias: "anita",
      birthDate: new Date("1998-01-01"),
      email: "ana@test.com",
      password: "1234",
    },
    {
      firstName: "Luis",
      lastName: "Pérez",
      alias: "lucho",
      birthDate: new Date("1995-02-02"),
      email: "luis@test.com",
      password: "1234",
    },
  ];

  for (const u of users) {
    const exists = await repo.findOne({ where: { email: u.email } });
    if (!exists) {
      const hash = await bcrypt.hash(u.password, 10);
      await repo.save({ ...u, password: hash });
    }
  }

  console.log("Usuarios de prueba creados");
  process.exit(0);
})();
