const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Gateway Documentation RunInsight",
      version: "1.0.0",
      description: "Documentación de la API usando Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Api Gateway Server",
      },
    //   {
    //     url: "http://localhost:3001/users",
    //     description: "User Service Server",
    //   },
    //   {
    //     url: "http://localhost:3002/trainings",
    //     description: "Training Service Server",
    //   },
    ],
    components: {
      securitySchemes: {
        TokenAuth: {
          type: "apiKey",
          in: "header",
          name: "token",
          description: "Token de autenticación de usuario"
        }
      }
    }
  },
  apis: ["./src/routes/*.js"], // Ruta corregida a los archivos de rutas donde están los comentarios Swagger
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
