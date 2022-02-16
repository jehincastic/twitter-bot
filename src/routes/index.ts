import { FastifyInstance } from "fastify";

import { getValidTime, readFileRecursive } from "../utils";

const initializeRoute = async (fastify: FastifyInstance) => {
  const promArr: any[] = [];
  // Read all files in the directory and imoprt them
  readFileRecursive(promArr);
  const data = await Promise.all(promArr);
  const isFailed = data.some((d) => !d[0]);
  if (isFailed) {
    throw new Error("Could not load all routes");
  }
  // Register all routes for imported files
  data.forEach(([, { routeName, route }]) => {
    fastify.register(route, {
      prefix: `/api/v1${routeName}`,
    });
  });
  // Handle for checking if the server is up
  fastify.get("/api/v1/ping", (_, res) => {
    res.status(200).send({
      status: "SUCCESS",
      message: `Server is running for ${getValidTime(Math.round(process.uptime()))}`,
    });
  });

  // Hnadle Not Found
  fastify.setNotFoundHandler((_, res) => {
    res.status(404).send({
      status: "FAILED",
      message: "Invalid Endpoint",
    });
  });

  // Handling Error
  fastify.setErrorHandler((error, _, res) => {
    if (error.validation) {
      res.status(400).send({
        status: "FAILED",
        message: error.validation[0].message,
      });
    } else if (error.statusCode) {
      res.status(error.statusCode).send({
        status: "FAILED",
        message: error.message,
      });
    } else {
      res.status(500).send({
        status: "FAILED",
        message: "Internal Server Error",
      });
    }
  });
};

export default initializeRoute;
