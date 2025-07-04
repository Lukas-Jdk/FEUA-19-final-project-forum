import express from 'express';
import authToken from '../middleware/authMiddleware.js';
import {
  CRATE_ANSWER,
  GET_ANSWERS_BY_QUESTION_ID
} from '../controllers/answerController.js';

const router = express.Router();

router.post("/:questionId", authToken, CRATE_ANSWER);
router.get("/:questionId", GET_ANSWERS_BY_QUESTION_ID);

export default router;
