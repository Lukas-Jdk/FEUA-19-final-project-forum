import styles from "./AnswerForm.module.css";
import axios from "@/axios/axios";
import { useState } from "react";

interface Props {
  questionId: string;
  onNew: () => void;
}

const AnswerForm = ({ questionId, onNew }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`/answers/${questionId}`, {
        answer_text: text,
      });
      setText("");
      onNew();
    } catch (error) {
      console.error("Submit error", error);
    }
  };

  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("token");
  if (!isLoggedIn) return null;

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      <p>New Answer</p>
      <textarea
      className={styles.textarea}
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Your answer"
      required
      />
      <div className={styles.answerBtn}>
        <button type="submit">Comment</button>
        </div>
  
    </form>
  );
};

export default AnswerForm;
