export const isProd = process.env.NODE_ENV === "production";
export const port = process.env.PORT || 4000;

export const clientId = process.env.TWITTER_CLIENT_ID as string;
export const clientSecret = process.env.TWITTER_CLIENT_SECRET as string;
export const callBackUrl = process.env.TWITTER_CALLBACK_URI as string;

export const faunaKey = process.env.FAUNA_SERVER_KEY as string;

export const redisUrl = process.env.REDIS_URL as string;

export const baseUrl = process.env.BASE_URL as string;
