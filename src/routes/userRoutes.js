import express from 'express';
import {REGISTER_USER, LOGIN_USER} from '../controllers/authController.js';

const router = express.Router();

router.post("/register", REGISTER_USER);
router.post("/login", LOGIN_USER)

export default router;