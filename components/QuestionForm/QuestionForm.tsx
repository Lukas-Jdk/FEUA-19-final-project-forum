import { useState } from "react";
import axios from "@/axios/axios";
import { useRouter } from "next/router";
import styles from "./QuestionForm.module.css";

const QuestionForm = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || text.length < 5) {
      setError("Question must be at least 5 characters long.");
      return;
    }

    try {
      await axios.post("/questions", { question_text: text });
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit question.");
    }
  };

  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("token");
  if (!isLoggedIn) return <p>You must be logged in to ask a question.</p>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Ask a Question</h2>
      <textarea
      className={styles.textarea}
        placeholder="Your question..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required

      />
      <button type="submit">Submit</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default QuestionForm;
