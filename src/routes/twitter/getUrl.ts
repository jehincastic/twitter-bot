import { FastifyPluginAsync } from "fastify";

import { makeSchemaObject } from "../../utils";
import {
  getUrlController,
} from "../../controllers/twitter";
import {
  getUrlResponseSchema,
  commonErrorResponseSchema,
  GetUrlResponse,
  CommonRequest,
} from "../../types";

const Routes: FastifyPluginAsync = async (fastify) => {
  fastify.get<CommonRequest<GetUrlResponse>>(
    "/",
    {
      schema: makeSchemaObject({
        response: [{
          status: 200,
          data: getUrlResponseSchema,
        }, {
          status: [404, 500],
          data: commonErrorResponseSchema,
        }],
      }),
    },
    getUrlController,
  );
};

export default Routes;
