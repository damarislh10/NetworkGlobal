import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Posts Service API",
      version: "1.0.0",
      description: "Servicio de publicaciones y likes con realtime (Socket.IO)."
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3002}`, description: "Local" }
    ],
    tags: [
      { name: "Posts", description: "Crear y listar publicaciones" },
      { name: "Likes", description: "Enviar likes (toggle) y ver conteo" }
    ],
    security: [{ bearerAuth: [] }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
      },
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            statusCode: { type: "integer", example: 400 },
            message: { type: "string", example: "Datos incompletos" }
          }
        },
        PostItem: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid" },
            message: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            likes: { type: "integer", example: 3 },
            likedByMe: { type: "boolean", example: false }
          }
        },
        PostCreatedResponse: {
          type: "object",
          properties: {
            statusCode: { type: "integer", example: 201 },
            message: { type: "string", example: "Post creado" },
            data: { $ref: "#/components/schemas/PostItem" }
          }
        },
        LikeResponse: {
          type: "object",
          properties: {
            statusCode: { type: "integer", example: 200 },
            message: { type: "string", example: "OK" },
            data: {
              type: "object",
              properties: {
                postId: { type: "string", format: "uuid" },
                likes: { type: "integer", example: 5 }
              }
            }
          }
        },
        CreatePostRequest: {
          type: "object",
          required: ["message"],
          properties: {
            message: { type: "string", example: "Hola mundo" }
          }
        }
      },
      responses: {
        Posts200: {
          description: "200 - Lista de publicaciones",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  statusCode: { type: "integer", example: 200 },
                  message: { type: "string", example: "OK" },
                  data: { type: "array", items: { $ref: "#/components/schemas/PostItem" } }
                }
              },
              examples: {
                ok: {
                  value: {
                    statusCode: 200,
                    message: "OK",
                    data: [
                      {
                        id: "a1111111-1111-1111-1111-111111111111",
                        userId: "b2222222-2222-2222-2222-222222222222",
                        message: "Primer post",
                        createdAt: "2025-09-18T00:00:00.000Z",
                        likes: 2,
                        likedByMe: false
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        PostCreated201: {
          description: "201 - Post creado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PostCreatedResponse" },
              examples: {
                created: {
                  value: {
                    statusCode: 201,
                    message: "Post creado",
                    data: {
                      id: "c3333333-3333-3333-3333-333333333333",
                      userId: "b2222222-2222-2222-2222-222222222222",
                      message: "Hola mundo",
                      createdAt: "2025-09-18T00:00:00.000Z",
                      likes: 0,
                      likedByMe: false
                    }
                  }
                }
              }
            }
          }
        },
        Like200: {
          description: "200 - Total de likes actualizado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LikeResponse" },
              examples: {
                toggled: {
                  value: {
                    statusCode: 200,
                    message: "OK",
                    data: { postId: "c3333333-3333-3333-3333-333333333333", likes: 5 }
                  }
                }
              }
            }
          }
        },
        BadRequest400: {
          description: "400 - Petición inválida",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                createPost: {
                  summary: "Create Post",
                  value: { statusCode: 400, message: "Datos incompletos" }
                },
                likePost: {
                  summary: "Like Post",
                  value: { statusCode: 400, message: "postId requerido" }
                }
              }
            }
          }
        },
        Unauthorized401: {
          description: "401 - No autorizado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                default: { value: { statusCode: 401, message: "No autorizado" } }
              }
            }
          }
        },
        Internal500: {
          description: "500 - Servicio no disponible",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                default: { value: { statusCode: 500, message: "Servicio no disponible" } }
              }
            }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.ts"]
});
