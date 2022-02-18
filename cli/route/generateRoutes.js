const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const checkIfAlreadyExists = (urlPath) => {
  const filePath = path.join(process.cwd(), "src", "routes", `${urlPath}.ts`);
  const indexFilePath = path.join(process.cwd(), "src", "routes", urlPath, "index.ts");
  const fileExists = fs.existsSync(filePath);
  const indexFileExists = fs.existsSync(indexFilePath);
  if (fileExists || indexFileExists) {
    throw new Error(`Route ${urlPath} already exists`);
  }
};

const alltypes = (response, query, params, body) => {
  const types = ["CommonRequest", "CommonErrorResponseSchema"];
  if (response) {
    types.push(response);
    types.push(`${response}Schema`);
  }
  if (query && query !== "N/A") {
    types.push(query);
    types.push(`${query}Schema`);
  }
  if (params && params !== "N/A") {
    types.push(params);
    types.push(`${params}Schema`);
  }
  if (body && body !== "N/A") {
    types.push(body);
    types.push(`${body}Schema`);
  }
  return [...new Set(types)];
};

const generateImports = (types) => {
  const importString = `
    import { FastifyPluginAsync } from "fastify";

    import { makeSchemaObject } from "../../utils";
    import {
      ${types.join(",\n")}
    } from "../../types";
  `;
  return importString.trim();
};

const generateExports = () => "export default Routes;";

const generateReqSchema = (
  errorCodes,
  responseType,
  queryType,
  paramsType,
  bodyType,
) => {
  const errorCodesString = errorCodes.join();
  const typeStrings = [];
  if (bodyType !== "N/A") {
    typeStrings.push(`body: ${bodyType}Schema,`);
  }
  if (queryType !== "N/A") {
    typeStrings.push(`query: ${queryType}Schema,`);
  }
  if (paramsType !== "N/A") {
    typeStrings.push(`params: ${paramsType}Schema,`);
  }
  return `{
    schema: makeSchemaObject({
      response: [{
        status: 200,
        data: ${responseType}Schema,
      }, {
        status: [${errorCodesString}],
        data: CommonErrorResponseSchema,
      }],
      ${typeStrings.join("\n")}
    }),
  }`;
};

const generateBody = (
  method,
  schema,
  responseType,
  queryType,
  paramsType,
  bodyType,
) => {
  const requestType = [];
  requestType.push(responseType);
  requestType.push(bodyType !== "N/A" ? bodyType : "unknown");
  requestType.push(queryType !== "N/A" ? queryType : "unknown");
  requestType.push(paramsType !== "N/A" ? paramsType : "unknown");
  if (requestType[3] === "unknown") {
    if (requestType[2] === "unknown") {
      if (requestType[1] === "unknown") {
        requestType.pop();
        requestType.pop();
        requestType.pop();
      } else {
        requestType.pop();
        requestType.pop();
      }
    } else {
      requestType.pop();
    }
  }
  const data = `
    const Routes: FastifyPluginAsync = async (fastify) => {
      fastify.${method.toLowerCase()}<CommonRequest<${requestType.join(", ")}>>(
        "/",
        ${schema},
        (req, res) => {
          res.send({
            status: "SUCCESS",
            data: {},
          });
        },
      );
    };
  `;
  return data;
};

const generateCode = (
  types,
  errorCode,
  requestMethod,
  basePath,
  responseType,
  queryType,
  paramsType,
  bodyType,
) => {
  const imports = generateImports(types);
  const exportsData = generateExports();
  const schema = generateReqSchema(
    errorCode,
    responseType,
    queryType,
    paramsType,
    bodyType,
  );
  const body = generateBody(
    requestMethod,
    schema,
    responseType,
    queryType,
    paramsType,
    bodyType,
  );
  const fileContent = `${imports}\n\n${body}\n\n${exportsData}`;
  const filePath = path.join(process.cwd(), "src", "routes", `${basePath}.ts`);
  const fileDir = path.dirname(filePath);
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true });
  }
  fs.writeFileSync(filePath, fileContent);
};

const generateRoutes = ({
  routeName,
  responseType,
  errorCode,
  requestMethod,
  queryType,
  paramsType,
  bodyType,
}) => {
  const basePath = routeName.split("/api/v1/")[1];
  checkIfAlreadyExists(basePath);
  const types = alltypes(responseType, queryType, paramsType, bodyType);
  generateCode(
    types,
    errorCode,
    requestMethod,
    basePath,
    responseType,
    queryType,
    paramsType,
    bodyType,
  );
  const filePath = `src/routes/${basePath}.ts`;
  execSync(`npx eslint ${filePath} --fix`, { stdio: "inherit" });
};

module.exports = generateRoutes;
