export const commonErrorResponseSchema: Object = {
  title: "CommonErrorResponse",
  type: "object",
  properties: {
    status: {
      type: "string",
      enum: [
        "FAILED",
        "SUCCESS",
      ],
    },
    message: {
      type: "string",
    },
  },
  additionalProperties: false,
  required: [
    "status",
    "message",
  ],
  id: "Error Response",
};

export * from "./auth";
export * from "./twitter";
