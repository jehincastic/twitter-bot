// eslint-disable-next-line import/no-extraneous-dependencies
const { prompt } = require("enquirer");

const requestQuestions = async (requestMethod, types) => {
  const questions = [
    {
      type: "autocomplete",
      name: "queryType",
      message: "What is the type name of QueryString ?",
      choices: ["N/A", ...types.query],
      required: true,
      limit: 10,
    }, {
      type: "autocomplete",
      name: "paramsType",
      message: "What is the type name of Params ?",
      choices: ["N/A", ...types.params],
      required: true,
      limit: 10,
    },
  ];
  if (requestMethod !== "GET" || requestMethod !== "DELETE") {
    questions.push({
      type: "autocomplete",
      name: "bodyType",
      message: "What is the type name of Body ?",
      choices: ["N/A", ...types.body],
      required: true,
      limit: 10,
    });
  }
  return prompt(questions);
};

module.exports = requestQuestions;
