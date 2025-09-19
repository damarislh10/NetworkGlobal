# Network Social — Frontend (Vite + React TS + Zustand + Tailwind + Sass)

## Requisitos
- Node 18+
- Backend corriendo:
  - Auth: http://localhost:3001
  - Posts: http://localhost:3002

## Configuración
1. Copia `.env.development` a `.env` y ajustar URLs si es necesario.
2. Instala deps:
   ```bash
   npm i
   ```
3. Ejecuta en dev:
   ```bash
   npm run dev
   ```

## Rutas
- `/login` — Iniciar sesión
- `/` — Feed (protegida)
- `/create` — Crear publicación (protegida)
- `/profile` — Perfil (protegida)

## Estado
- Zustand (`src/store/*`) para auth y posts.
- Interceptores Axios inyectan JWT.
- Likes en tiempo real con Socket.IO.
