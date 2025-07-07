import Question from '../models/Question.js';
import Answer from '../models/Answer.js';

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



export const GET_FILTERED_QUESTIONS = async (req, res) => {
  try {
    const answered = req.query.answered === "true";
    const collectAnswersId = await Answer.distinct("question_id");

    let questions;

    if (answered) {
      questions = await Question.find({ id: { $in: collectAnswersId } });
    } else {
      questions = await Question.find({ id: { $nin: collectAnswersId } });
    }

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Filter error", error);
    res.status(500).json({ message: "Server error filtering questions." });
  }
};



export const DELETE_QUESTION = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await Question.findOne ({ id:questionId});

    if(!question) {
      return res.status(404).json({message: "Question not found."});
    }

    if (question.user_id !== req.user.userId) {
      return res.status(403).json ({message: "You are not allowed to delete this question."});
    }
    await Question.deleteOne({ id: questionId });
    res.status(200).json({message: "Question deleted successfully."});
  }catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({message: "Server error during question deletion."})
  }
};