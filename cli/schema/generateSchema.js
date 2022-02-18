// eslint-disable-next-line import/no-extraneous-dependencies
const { compile } = require("json-schema-to-typescript");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { capitialize } = require("../utils");

const generateCommonResponse = (resp) => {
  const data = resp;
  delete data.commonResponse;
  const newProperty = {
    status: {
      type: "string",
      enum: ["SUCCESS"],
    },
    data: {
      type: "object",
      properties: {
        ...data.properties,
      },
      additionalProperties: false,
      required: [...data.required],
    },
  };
  data.properties = newProperty;
  data.required = ["status", "data"];
  return data;
};

const generateSchemaData = async (
  schema,
  name,
  filePath,
) => {
  const ts = await compile(schema, name);
  const schemaVar = `\nexport const ${capitialize(name)}Schema: Object = ${JSON.stringify(schema, null, 2)};\n\n`;
  return {
    data: ts,
    fileName: name,
    filePath,
    schema: schemaVar,
  };
};

const processFile = async (filePath) => {
  const promArr = [];
  const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"));
  fileData.forEach((data) => {
    let newData = data;
    delete newData.schemaType;
    if (data.commonResponse) {
      newData = generateCommonResponse(data);
    }
    promArr.push(generateSchemaData(newData, data.title, filePath));
  });
  return Promise.all(promArr);
};

const processDirectory = async (dirPath, promArr) => {
  const dirContents = fs.readdirSync(dirPath, { withFileTypes: true });
  dirContents.forEach((content) => {
    if (content.isDirectory()) {
      processDirectory(path.join(dirPath, content.name), promArr);
    } else {
      promArr.push(processFile(path.join(dirPath, content.name)));
    }
  });
};

const init = async () => {
  const folderPath = path.join(process.cwd(), "src", "types", "schema");
  if (fs.existsSync(folderPath)) {
    await fs.rmSync(folderPath, { recursive: true });
  }
  await fs.mkdirSync(folderPath);
  const inputpath = path.join(process.cwd(), "schema");
  const promArr = [];
  await processDirectory(inputpath, promArr);
  const data = await Promise.all(promArr);
  let indexTsContent = `export const CommonErrorResponseSchema: Object = {
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
  };\n\n`;
  data.forEach((folderData) => {
    let { filePath } = folderData[0];
    let content = "";
    filePath = filePath.replace("schema", "src/types/schema").replace(".json", ".ts");
    folderData.forEach((fileData) => {
      const { data: ts, schema } = fileData;
      content += (ts + schema);
    });
    const filesDir = path.dirname(filePath);
    if (!fs.existsSync(filesDir)) {
      fs.mkdirSync(filesDir);
    }
    fs.writeFileSync(filePath, content);
    const exportPath = filePath.replace(/.*\/schema/, ".").replace(".ts", "").replace("/index", "");
    indexTsContent += `export * from "${exportPath}";\n`;
  });
  fs.writeFileSync(path.join(folderPath, "index.ts"), indexTsContent);
  execSync("npx eslint src/types/schema/**/**.ts --fix", { stdio: "inherit" });
};

if (require.main === module) {
  // eslint-disable-next-line no-console
  init().catch(console.error);
} else {
  module.exports = {
    init,
  };
}
