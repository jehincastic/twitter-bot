import { FastifyRegisterOptions } from "fastify";
import { SwaggerOptions } from "fastify-swagger";

const generateSwaggerOptions = (
  hostname: string,
  protocol: string,
): FastifyRegisterOptions<SwaggerOptions> | undefined => ({
  routePrefix: "/docs",
  exposeRoute: true,
  swagger: {
    info: {
      title: "Twitter Bot",
      description: "Twitter Bot Api",
      version: "1.0.0",
    },
    host: hostname,
    schemes: [protocol],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [],
    definitions: {},
    securityDefinitions: {
      auth: {
        type: "apiKey",
        name: "Authorization",
        description: "",
        in: "header",
      },
    },
  },
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  staticCSP: true,
});

export default generateSwaggerOptions;
