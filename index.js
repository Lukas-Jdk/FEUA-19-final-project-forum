import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./src/routes/userRoutes.js";
import questionRouter from './src/routes/questionRoutes.js';
import answerRouter from './src/routes/answerRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB logged in susccesfully");

    app.use("/users", userRouter);
    app.use("/questions", questionRouter);
    app.use("/answers", answerRouter)

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to login at MongoDB", error);
  }
};

startServer();
