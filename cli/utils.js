const fs = require("fs");
const path = require("path");

const makeApiUrl = (urlPath) => `/api/v1${
  urlPath.startsWith("/")
    ? ""
    : "/"
}${urlPath.toLowerCase()}`;

const capitialize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const filerTypes = (types) => {
  const typeObj = {
    body: [],
    params: [],
    query: [],
    response: [],
  };
  types.forEach(({ name, type }) => {
    typeObj[type].push(name);
  });
  return typeObj;
};

const getAllTypes = () => {
  const schemaPath = path.join(process.cwd(), "schema");
  let files = fs.readdirSync(schemaPath, { withFileTypes: true });
  files = files.filter((file) => file.isFile() && file.name.endsWith(".json"));
  const fileContents = files.map(({ name }) => {
    const filePath = path.join(schemaPath, name);
    const filecontent = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return filecontent.map(({ title, schemaType }) => ({
      name: capitialize(title),
      type: schemaType,
    }));
  });
  return filerTypes(fileContents.flat());
};

module.exports = {
  makeApiUrl,
  capitialize,
  getAllTypes,
};
