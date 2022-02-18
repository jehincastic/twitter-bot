const { init } = require("./generateSchema");

const generateSchema = async () => {
  await init();
};

module.exports = generateSchema;
