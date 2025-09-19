/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jsdom',
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
    },
    moduleNameMapper: {
        '^@lib/(.*)$': '<rootDir>/src/lib/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@store/(.*)$': '<rootDir>/src/store/$1',
        '^@styles/(.*)$': '<rootDir>/src/styles/$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    },
    // Si usas TypeScript:
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
    testMatch: ['**/?(*.)+(test|spec).(ts|tsx)'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/main.tsx', '!src/router.tsx', '!src/styles/**', '!src/lib/socket.ts'],
};
