import express from 'express';
import authToken from '../middleware/authMiddleware.js';
import {
  CREATE_ANSWER,
  GET_ANSWERS_BY_QUESTION_ID,
  DELETE_ANSWER,
  LIKE_DISLIKE
} from '../controllers/answerController.js';

const router = express.Router();

router.post("/:questionId", authToken, CREATE_ANSWER);
router.get("/:questionId", GET_ANSWERS_BY_QUESTION_ID);
router.delete("/:answerId", authToken, DELETE_ANSWER)
router.patch("/:id/like", authToken, LIKE_DISLIKE)

export default router;
