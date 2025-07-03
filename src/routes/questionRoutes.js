import express from 'express';
import {CREATE_QUESTION, GET_ALL_QUESTIONS} from '../controllers/questionController.js';
import authToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post ("/", authToken, CREATE_QUESTION);

router.get ("/", authToken, GET_ALL_QUESTIONS);

export default router;