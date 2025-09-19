import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  // 👇 aquí el fix
  roots: ["<rootDir>/src/tests"],
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"],

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/server.ts",
    "!src/**/swagger.ts",
    "!src/**/*.d.ts",
  ],
  verbose: true,
};

export default config;
