# NetworkGlobal

NetworkGlobal es una aplicación de red social
Incluye un backend con servicios de autenticación y publicaciones (Node.js, Express, TypeORM, PostgreSQL), docker y un frontend moderno construido con React, Vite, TypeScript, jest - coverage.

## Características principales

- Registro e inicio de sesión de usuarios
- Publicación y visualización de posts en tiempo real
- Sistema de likes y comentarios
- Navegación protegida por autenticación

## Estructura del proyecto

- `/Backend`: Servicios de autenticación y publicaciones
- `/Frontend`: Aplicación web en React ts
- `/docs`: Documentación swagger

## Instalación rápida

```bash
# Backend
cd Backend/auth-service
cd Backend/posts-service
npm install
npm run dev

# Frontend
cd ../../Frontend/frontend-react-vite-ts-zustand
npm install
npm run dev
```

## Requisitos

- Node.js 18+
- PostgreSQL

## Licencia

MIT