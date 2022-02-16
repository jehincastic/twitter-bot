import {
  RequestBodyDefault,
  RequestQuerystringDefault,
  RequestParamsDefault,
  RequestHeadersDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from "fastify";

export interface CommonRequest<
  R=unknown,
  B=RequestBodyDefault,
  Q=RequestQuerystringDefault,
  P=RequestParamsDefault,
  H=RequestHeadersDefault,
> {
  Body: B;
  Querystring: Q;
  Params: P;
  Headers: H;
  Reply: R;
}

export type RequestHandler<
  R=unknown,
  B=RequestBodyDefault,
  Q=RequestQuerystringDefault,
  P=RequestParamsDefault,
  H=RequestHeadersDefault
> = RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  CommonRequest<R, B, Q, P, H>
>;

export interface AccountType {
  id: string;
  refreshToken?: string;
  accessToken: string;
  expiresIn: number;
}

export * from "./schema";
