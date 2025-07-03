import Question from '../models/Question.js';

export const CREATE_QUESTION = async (req, res) => {
  try {
    const {question_text} = req.body;

    if (!question_text) {
      return res.status(400).json({message: "Question text is required."});
    }
    const newQuestion = new Question({
      question_text,
      user_id: req.user.userId,
    });
    const saved = await newQuestion.save();
    res.status(201).json ({
      message: "Question created successfully.",
      question: saved,
    });
  }catch(error) {
    res.status(500).json ({message: "Server error creating question."})
  }
};

export const GET_ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await Question.find().sort({ date: -1 });
    res.status(200).json({questions});
  }catch (error) {
    res.status(500).json({message: "Server error fetching questions"})
  }
};