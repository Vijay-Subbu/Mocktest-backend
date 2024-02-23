const mockTests = require("../Data");

const getAllQuestions = (req, res) => {
  try {
    const allQuestions = mockTests.map(test => test.questions).flat();
    res.json(allQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getQuestionById = (req, res) => {
  try {
    const { testId, questionId } = req.params;
    const test = mockTests.find(test => test.id === parseInt(testId));
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    const question = test.questions.find(question => question.id === parseInt(questionId));
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAllQuestions, getQuestionById };
