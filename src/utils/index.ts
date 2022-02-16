import { FastifyError } from "fastify";

export const getUrlInfo = (url: string) => {
  const urlObj = new URL(url);
  return {
    fullUrl: url,
    hostname: urlObj.host,
    protocol: urlObj.protocol.split(":")[0],
  };
};

export const getValidTime = (seconds: number) => {
  if (seconds <= 60) {
    return `${seconds} seconds`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes <= 60) {
    return `${minutes} minutes`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours <= 24) {
    return `${hours} hours`;
  }
  const days = Math.floor(hours / 24);
  if (days <= 30) {
    return `${days} days`;
  }
  const months = Math.floor(days / 30);
  if (months <= 12) {
    return `${months} months`;
  }
  const years = Math.floor(months / 12);
  return `${years} years`;
};

export const makeCamelCase = (str: string) => {
  const camelString = str
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  return camelString;
};

export const generateFastifyError = (
  statusCode: number,
  message: string,
  code: string,
) => {
  const error: FastifyError = {
    statusCode,
    message,
    code,
    name: makeCamelCase(code),
  };
  return error;
};

export * from "./routerUtils";
