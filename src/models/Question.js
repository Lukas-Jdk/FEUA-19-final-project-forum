import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const questionSchema = new mongoose.Schema({
  id:{
    type: String,
    default: uuidv4,
    unique: true,
  },
  question_text:{
    type: String,
    required: true,
    trim: true,
    minLength:5,
  },
  data:{
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: String,
    required:true,
  },
});

const Question = mongoose.model("Question", questionSchema);
export default Question;