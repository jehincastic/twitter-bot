// eslint-disable-next-line import/no-extraneous-dependencies
const { prompt } = require("enquirer");
const { makeApiUrl } = require("../utils");

const baseQuestions = async () => {
  const questions = [
    {
      type: "input",
      name: "routeName",
      required: true,
      message: "What is the name of the route (/api/v1/*) ?",
      result: makeApiUrl,
    }, {
      type: "input",
      name: "schemaName",
      required: true,
      message: "What is the schema name for success response ?",
    }, {
      type: "multiselect",
      name: "errorCode",
      required: true,
      message: "What are all the applicable error codes ?",
      choices: [
        { name: "Bad Request [400]", value: 400 },
        { name: "Unauthorized [401]", value: 401 },
        { name: "Forbidden [403]", value: 403 },
        { name: "Not Found [404]", value: 404 },
        { name: "Internal Server Error [500]", value: 500 },
      ],
      result: (value) => value.map((v) => Number(v.match(/\[(\d+)\]/)[1])),
    }, {
      type: "select",
      name: "requestMethod",
      required: true,
      message: "What is the request method ?",
      choices: [
        { name: "GET", value: "GET" },
        { name: "POST", value: "POST" },
        { name: "PUT", value: "PUT" },
        { name: "PATCH", value: "PATCH" },
        { name: "DELETE", value: "DELETE" },
      ],
    },
  ];
  return prompt(questions);
};

module.exports = baseQuestions;