/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface LoginInput {
  email: string;
  password: string;
}

export const loginInputSchema: Object = {
  title: "loginInput",
  type: "object",
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  additionalProperties: false,
  required: [
    "email",
    "password",
  ],
  id: "LoginInput",
};

/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface SingUpInput {
  name?: string;
  email: string;
  password: string;
}

export const singUpInputSchema: Object = {
  title: "singUpInput",
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  additionalProperties: false,
  required: [
    "email",
    "password",
  ],
  id: "SingUpInput",
};

/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface LoginResponse {
  status: "SUCCESS" | "FAILED";
  data: {
    name: string;
    email: string;
    id: string;
    token: string;
  };
}

export const loginResponseSchema: Object = {
  title: "loginResponse",
  type: "object",
  properties: {
    status: {
      type: "string",
      enum: [
        "SUCCESS",
        "FAILED",
      ],
    },
    data: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        email: {
          type: "string",
        },
        id: {
          type: "string",
        },
        token: {
          type: "string",
        },
      },
      additionalProperties: false,
      required: [
        "name",
        "email",
        "id",
        "token",
      ],
    },
  },
  additionalProperties: false,
  required: [
    "status",
    "data",
  ],
  id: "LoginResponse",
};