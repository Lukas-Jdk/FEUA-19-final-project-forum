import express from 'express';
import {
  CREATE_QUESTION, 
  GET_ALL_QUESTIONS,
  DELETE_QUESTION,
  GET_FILTERED_QUESTIONS,
  
} from '../controllers/questionController.js';
import authToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post ("/", authToken, CREATE_QUESTION);

router.get ("/", authToken, GET_ALL_QUESTIONS);

router.delete("/:id", authToken, DELETE_QUESTION);

router.get("/filtered", GET_FILTERED_QUESTIONS);

export default router;