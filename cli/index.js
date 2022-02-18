// eslint-disable-next-line import/no-extraneous-dependencies
const { prompt } = require("enquirer");
const generateRouter = require("./route");
const generateSchema = require("./schema");

const main = async () => {
  const questions = [
    {
      type: "select",
      name: "type",
      required: true,
      message: "What do you want to do ?",
      choices: [
        { name: "Generate Router" },
        { name: "Generate Schema" },
      ],
    },
  ];
  const { type } = await prompt(questions);
  if (type === "Generate Router") {
    await generateRouter();
  } else {
    await generateSchema();
  }
};

// eslint-disable-next-line no-console
main().catch(console.error);
