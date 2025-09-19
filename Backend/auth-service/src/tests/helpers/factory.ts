export const rand = () => Math.floor(Math.random() * 1e9);

export function fakeUser() {
  const n = rand();
  return {
    firstName: "Ana",
    lastName: "Gómez",
    birthDate: "1998-01-01",
    alias: `anita${n}`,
    email: `ana${n}@test.com`,
    password: "123456",
  };
}
