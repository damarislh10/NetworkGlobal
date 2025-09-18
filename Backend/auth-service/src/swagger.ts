import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "My REST API - Documentation",
      version: "1.0.0",
      description:
        "Auth Service para la red social. Registro, login y perfil.\nIncluye respuestas estandarizadas y JWT Bearer.",
    },
    servers: [{ url: "http://localhost:3001", description: "Local Server" }],
    tags: [
      { name: "Auth", description: "Registro y Login (JWT)" },
      { name: "Users", description: "Perfil del usuario autenticado" },
    ],
    // seguridad global (candados en rutas protegidas)
    security: [{ bearerAuth: [] }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
      schemas: {
        // --- Esquemas usados por tus endpoints ---
        ErrorResponse: {
          type: "object",
          properties: {
            statusCode: { type: "integer", example: 400 },         // <-- AHORA número
            message:    { type: "string",  example: "Credenciales inválidas" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email:    { type: "string", format: "email", example: "ana@test.com" },
            password: { type: "string", example: "123456" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: { token: { type: "string", example: "eyJhbGciOi..." } },
        },
        RegisterRequest: {
          type: "object",
          required: ["firstName", "lastName", "birthDate", "alias", "email", "password"],
          properties: {
            firstName: { type: "string", example: "Ana" },
            lastName:  { type: "string", example: "Gómez" },
            birthDate: { type: "string", format: "date", example: "1998-01-01" },
            alias:     { type: "string", example: "anita" },
            email:     { type: "string", format: "email", example: "ana@test.com" },
            password:  { type: "string", minLength: 6, example: "123456" },
          },
        },
        // éxito de /auth/register (tal como responde tu controlador)
        RegisterCreatedResponse: {
          type: "object",
          properties: {
            statusCode: { type: "integer", example: 201 },
            message:    { type: "string",  example: "Usuario creado" }
          }
        },
        // perfil actual devuelve el usuario “plano”
        User: {
          type: "object",
          properties: {
            id:        { type: "string", format: "uuid" },
            firstName: { type: "string" },
            lastName:  { type: "string" },
            birthDate: { type: "string", format: "date-time" },
            alias:     { type: "string" },
            email:     { type: "string", format: "email" },
          },
        },
      },
      // --- Respuestas reusables con ejemplos consistentes ---
      responses: {
        Register201: {
          description: "201 - Usuario creado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterCreatedResponse" },
              examples: {
                created: { value: { statusCode: 201, message: "Usuario creado" } }
              }
            }
          }
        },
        Login200: {
          description: "200 - Login correcto (JWT)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginResponse" },
              examples: { ok: { value: { token: "eyJhbGciOi..." } } }
            }
          }
        },
        Profile200: {
          description: "200 - Perfil del usuario",
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/User" } }
          }
        },
        BadRequest404: {
          description: "404 - Petición inválida",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                missing: {
                  value: {
                    statusCode: 404,
                    message: "Solicitud inválida",
                  }
                },
                duplicate: {
                  value: { statusCode: 400, message: "Usuario ya registrado" } // <-- como devuelve tu /register
                }
              }
            }
          }
        },
        BadRequest400: {
          description: "400 - Duplicidad ",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                duplicate: {
                  value: { statusCode: 400, message: "Usuario ya registrado" } // <-- como devuelve tu /register
                }
              }
            }
          }
        },
        Unauthorized401: {
          description: "401 - No autorizado / Token inválido",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                invalid: { value: { statusCode: 401, message: "No autorizado" } }
              }
            }
          }
        },
        NotFound404: {
          description: "404 - No encontrado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                user: { value: { statusCode: 404, message: "No encontrado" } }
              }
            }
          }
        },
        Internal500: {
          description: "500 - Error interno",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                generic: { value: { statusCode: 500, message: "Servicio no disponible" } }
              }
            }
          }
        },
      },
    },
  },
  // leerá los comentarios de tus rutas
  apis: ["./src/routes/*.ts"],
});
