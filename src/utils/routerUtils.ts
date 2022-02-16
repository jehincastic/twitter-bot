import { FastifySchema } from "fastify";
import fs from "fs";
import { join } from "path";

const importFile = async (path: string, routeName: string) => {
  try {
    const route = await import(path);
    return [true, { routeName, route }];
  } catch (err) {
    return [false, err];
  }
};

export const readFileRecursive = (promArr: any[], basePath = "/") => {
  const path = join(`${__dirname}/../routes`, basePath);
  // Read all files in the directory and iterate over them
  fs.readdirSync(path, { withFileTypes: true }).forEach((file) => {
    // Imort the file contents using importFile
    if (file.isFile()) {
      if (/\.[jt]s$/.test(file.name)) {
        const isIndexFile = /^index\.[jt]s$/.test(file.name);
        if (!(isIndexFile && basePath === "/")) {
          const fileName = file.name;
          let routeName = basePath;
          if (!isIndexFile) {
            routeName += `/${fileName.replace(/\.[jt]s$/, "")}`;
          }
          promArr.push(importFile(join(path, fileName), routeName));
        }
      }
    }
    // If the file is a directory, recursively call this function
    if (file.isDirectory()) {
      const baseName = file.name;
      readFileRecursive(promArr, `${basePath}${baseName}`);
    }
  });
};

export const makeSchemaObject = ({
  response,
  body,
  query,
  params,
  headers,
}: {
  response: { status: number | number[]; data: any }[],
  body?: any,
  query?: any,
  params?: any,
  headers?: any,
}) => {
  const schemaObj: FastifySchema = {};
  if (body) {
    schemaObj.body = body;
  }
  if (query) {
    schemaObj.querystring = query;
  }
  if (params) {
    schemaObj.params = params;
  }
  if (headers) {
    schemaObj.headers = headers;
  }
  const respObj: Record<any, any> = {};
  response.forEach((resp) => {
    if (typeof resp.status === "number") {
      respObj[resp.status] = resp.data;
    } else {
      resp.status.forEach((status) => {
        respObj[status] = resp.data;
      });
    }
  });
  schemaObj.response = respObj;
  return schemaObj;
};
