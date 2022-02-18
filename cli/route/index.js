const { getAllTypes } = require("../utils");
const baseQuestions = require("./baseQuestions");
const requestQuestions = require("./requestQuestions");

const generateRouter = async () => {
  const alltypes = getAllTypes();
  const baseAnswer = await baseQuestions(alltypes);
  const requestAnswer = await requestQuestions(baseAnswer.requestMethod, alltypes);
  const answer = {
    ...baseAnswer,
    ...requestAnswer,
  };
  // eslint-disable-next-line no-console
  console.log(answer);
};

module.exports = generateRouter;
