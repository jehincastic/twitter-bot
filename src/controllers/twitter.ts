import { generateFastifyError } from "../utils";
import { generateAuthUrl } from "../lib/twitter";
import {
  RequestHandler,
  GetUrlResponse,
  CallBackQueryString as cbqs,
  CallBackResponse as cbr,
} from "../types";
import { handleCallback } from "../services/twitter";

export const getUrlController: RequestHandler<GetUrlResponse> = async function (
  _,
  res,
) {
  const {
    url,
    state,
    codeVerifier,
  } = generateAuthUrl();
  await this.redis.set(state, codeVerifier, "EX", 60 * 5);
  res.send({
    status: "SUCCESS",
    data: {
      url,
      state,
      codeVerifier,
    },
  });
};

export const callBackController: RequestHandler<cbr, unknown, cbqs> = async function (
  req,
  res,
) {
  const {
    code,
    state,
  } = req.query;
  const codeVerifier = await this.redis.get(state);
  if (codeVerifier) {
    const userInfo = await handleCallback(code, codeVerifier);
    res.send({
      status: "SUCCESS",
      data: userInfo,
    });
  }
  throw generateFastifyError(404, "Invalid State", "INVALID_REQUEST");
};
