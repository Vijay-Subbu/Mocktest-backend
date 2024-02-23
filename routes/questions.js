const express = require("express");
const { getAllQuestions, getQuestionById } = require("../controllers/questionController");

const router = express.Router();

router.get('/api/questions', getAllQuestions);
router.get('/api/:testId/questions/:questionId', getQuestionById);

module.exports = router;
