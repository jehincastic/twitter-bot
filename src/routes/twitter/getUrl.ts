import { FastifyPluginAsync } from "fastify";

import { makeSchemaObject } from "../../utils";
import {
  getUrlController,
} from "../../controllers/twitter";
import {
  GetUrlResponseSchema,
  CommonErrorResponseSchema,
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
          data: GetUrlResponseSchema,
        }, {
          status: [404, 500],
          data: CommonErrorResponseSchema,
        }],
      }),
    },
    getUrlController,
  );
};

export default Routes;
