import { FastifyPluginAsync } from "fastify";

import { makeSchemaObject } from "../../utils";
import {
  CallBackQueryString,
  callBackQueryStringSchema,
  CallBackResponse,
  callBackResponseSchema,
  commonErrorResponseSchema,
  CommonRequest,
} from "../../types";
import { callBackController } from "../../controllers/twitter";

const Routes: FastifyPluginAsync = async (fastify) => {
  fastify.get<CommonRequest<CallBackResponse, unknown, CallBackQueryString>>(
    "/",
    {
      schema: makeSchemaObject({
        response: [{
          status: 200,
          data: callBackResponseSchema,
        }, {
          status: [404, 500],
          data: commonErrorResponseSchema,
        }],
        query: callBackQueryStringSchema,
      }),
    },
    callBackController,
  );
};

export default Routes;
