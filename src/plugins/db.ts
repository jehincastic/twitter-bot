import { FastifyPluginAsync } from "fastify";
import fastifyPligun from "fastify-plugin";

import {
  client,
  query,
} from "../lib/fauna";
import redisClient from "../lib/redis";

const dbPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorate("fauna", {
    client,
    query,
  });
  fastify.decorate("redis", redisClient);
};

const plugin = fastifyPligun(dbPlugin);

export default plugin;
