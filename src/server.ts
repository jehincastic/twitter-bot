import Fastify, { FastifyInstance } from "fastify";
import AutoLoad from "fastify-autoload";
import cors from "fastify-cors";
import helmet from "fastify-helmet";
import Swagger from "fastify-swagger";
import { join } from "path";

import initializeRoute from "./routes";
import { getUrlInfo } from "./utils";
import {
  baseUrl,
  isProd,
  port,
} from "./config";
import generateSwaggerOptions from "./utils/swagger";

export const getServer = () => Fastify({
  logger: !isProd,
});

export const initializeServer = async (fastify: FastifyInstance) => {
  // Get the hostname and protocol from url
  const {
    hostname,
    protocol,
  } = getUrlInfo(baseUrl);

  // Setup Helmet
  fastify.register(helmet);

  // Setup CORS
  fastify.register(cors, {
    origin: isProd ? hostname : "*",
    credentials: true,
  });

  // Setup Custom Plugins
  fastify.register(AutoLoad, {
    dir: join(`${__dirname}/plugins`),
  });

  // Setup Swaggger
  fastify.register(Swagger, generateSwaggerOptions(hostname, protocol));

  // Setup Routes
  await initializeRoute(fastify);
};

const startServer = async () => {
  // Initialize the Fastify server
  const fastify = getServer();

  try {
    // Initialize the plugins and routes
    await initializeServer(fastify);

    // Listen on the specified port
    await fastify.listen(port);

    fastify.log.info(`server listening on ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

export default startServer;
