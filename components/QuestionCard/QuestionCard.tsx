import styles from "./QuestionCard.module.css";
import { Question } from "@/types/types";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  question: Question;
}

const QuestionCard: React.FC<Props> = ({ question }) => {
  const router = useRouter();

  return (
   <div
  className={styles.questionCard}
  onClick={() => router.push(`/question/${question.id}`)}
>
  <h3>{question.question_text}</h3>

  <p>
    {question.date ? new Date(question.date).toLocaleString() : "Date unavailable"}
  </p>

  <p>{question.user_id}</p>
</div>
  );
};

export default QuestionCard;
