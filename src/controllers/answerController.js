import Answer from "../models/Answer.js";

export const CREATE_ANSWER = async (req, res) => {
  try {
    const {answer_text} = req.body;
    const questionId = req.params.questionId;

    if(!answer_text) {
      return res.status(400).json({message: "Answer text is required."});
    }
    const newAnswer = new Answer({
      answer_text,
      question_id: questionId,
      user_id: req.user.userId,
    });
    const saved = await newAnswer.save();

    res.status(201).json({
      message:"Answer submitted susccessfully.",
      answer: saved,
    });
  }catch(error) {
    res.status(500).json({message:"Server error submitting answer."});

  }
};

export const GET_ANSWERS_BY_QUESTION_ID = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const answers = await Answer.find({question_id:questionId}).sort({date:-1});
    res.status(200).json({answers});
  } catch(error) {
    console.error("error:", error);
    res.status(500).json({message: "Server error fetching answers."})
  }
};

export const DELETE_ANSWER = async (req, res) => {
  try {
    const answerId = req.params.answerId;
    const answer = await Answer.findOne({id: answerId});

    if(!answer) {
      return res.status(404).json({message: "Answer not found."});
    }
    if(answer.user_id !== req.user.userId) {
      return res.status(403).json({message: "You are not allowed to do that."});
    }
    await Answer.deleteOne({id:answerId});
    
    res.status(200).json({message: "Answer was deleted susccessfully."});
    
  }catch (error) {
    console.error("Delete answer error". error);
    res.status(500).json({message: "Server error by deleting answer"})
  }

};