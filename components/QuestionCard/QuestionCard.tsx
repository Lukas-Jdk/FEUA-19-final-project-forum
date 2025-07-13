import styles from "./QuestionCard.module.css";
import { Question } from "@/types/types";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  question: Question;
  showDelete?: boolean;
  onDelete?: () => void;
}

const QuestionCard: React.FC<Props> = ({ question, showDelete = false, onDelete }) => {
  const router = useRouter();

  return (
   <div className={styles.questionCard}
  onClick={() => router.push(`/question/${question.id}`)}>
  <h3>{question.question_text}</h3>
 
       <div className={styles.bottom}> 
        <p>{question.date ? new Date(question.date).toLocaleString() : "Date unavailable"}</p>
     {showDelete && onDelete && (
        <button onClick={onDelete}>Delete Question</button>
      )}</div>
  </div>
 
  );
};

export default QuestionCard;
