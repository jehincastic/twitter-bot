/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import fastify from "fastify";
import fauna from "faunadb";
import Redis from "ioredis";

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    TWITTER_CLIENT_ID: string;
    TWITTER_CLIENT_SECRET: string;
    TWITTER_CALLBACK_URI: string;
    FAUNA_SERVER_KEY: string;
    PORT: string;
    JWT_SECRET: string;
    BASE_URL: string;
    REDIS_URL: string;
  }
}

declare module "fastify" {
  export interface FastifyInstance {
    fauna: {
      client: fauna.Client;
      query: typeof fauna.query;
    },
    redis: Redis.Redis;
  }
  export interface FastifyRequest {
    userId?: string;
  }
}
