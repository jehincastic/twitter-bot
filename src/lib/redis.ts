import Redis from "ioredis";

import { redisUrl } from "../config";

const redis = new Redis(redisUrl);

export default redis;
