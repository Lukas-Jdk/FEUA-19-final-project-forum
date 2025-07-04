import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';

const answerSchema = new mongoose.Schema({
  id:{
    type: String,
    default: uuidv4,
    unique: true,
  },
  answer_text: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  question_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  gained_likes_number: {
    type: Number,
    default: 0.
  },
  liked_by: {
    type: [String],
    default: []
  }
});

const Answer = mongoose.model("Answer",answerSchema);
export default Answer;