import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'node:test';

// Limpia el DOM entre pruebas
afterEach(() => cleanup());