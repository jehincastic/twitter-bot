/* eslint-disable import/no-extraneous-dependencies */
const ora = require("ora");

const { getAllTypes } = require("../utils");
const baseQuestions = require("./baseQuestions");
const generateRoutes = require("./generateRoutes");
const requestQuestions = require("./requestQuestions");

const generateRouter = async () => {
  const spinner = ora("Generating router...");
  try {
    const alltypes = getAllTypes();
    const baseAnswer = await baseQuestions(alltypes);
    const requestAnswer = await requestQuestions(baseAnswer.requestMethod, alltypes);
    const answer = {
      ...baseAnswer,
      ...requestAnswer,
    };
    spinner.start();
    generateRoutes(answer);
    spinner.succeed("Router generated successfully");
  } catch (error) {
    spinner.fail(error.message);
  }
};

module.exports = generateRouter;
