import { FastifyPluginAsync } from "fastify";

import { makeSchemaObject } from "../../utils";
import {
  CallBackQueryString,
  CallBackQueryStringSchema,
  CallBackResponse,
  CallBackResponseSchema,
  CommonErrorResponseSchema,
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
          data: CallBackResponseSchema,
        }, {
          status: [404, 500],
          data: CommonErrorResponseSchema,
        }],
        query: CallBackQueryStringSchema,
      }),
    },
    callBackController,
  );
};

export default Routes;
