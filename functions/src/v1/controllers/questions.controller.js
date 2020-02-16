const { questionsService } = require('../services');

const getQuestions = async (req, res) => {
  const { track } = req.body;
  const questions = await questionsService.getQuestions(track);
  res.status(200).send(questions);
};

module.exports = {
  getQuestions,
};
