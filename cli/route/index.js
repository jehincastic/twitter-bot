const baseQuestions = require("./baseQuestions");

const generateRouter = async () => {
  const baseAnswers = await baseQuestions();
  // eslint-disable-next-line no-console
  console.log(baseAnswers);
};

module.exports = generateRouter;
