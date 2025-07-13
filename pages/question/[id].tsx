import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Answer, Question } from "@/types/types";
import axios from "@/axios/axios";
import Layout from "@/components/Layout/Layout";
import AnswerCard from "@/components/AnswerCard/AnswerCard";
import AnswerForm from "@/components/AnswerForm/AnswerForm";
import authRedirect from "@/hooks/authRedirect";
import styles from "@/styles/id.module.css";
import QuestionCard from "@/components/QuestionCard/QuestionCard";

const QuestionPage = () => {
  authRedirect();
  const router = useRouter();
  const { id } = router.query;
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // 1. Gauti visus klausimus ir rasti pagal ID
      const qRes = await axios.get("/questions");
      const selected = qRes.data.questions.find(
        (q: Question) => q.id === String(id)
      );
      setQuestion(selected);

      if (!selected) {
        setError("Question not found.");
        return;
      }

      // 2. Gauti atsakymus
      const aRes = await axios.get(`/answers/${String(id)}`);
      setAnswers(aRes.data.answers);
    } catch (err) {
      setError("Failed to get data");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`questions/${question?.id}`);
      router.push("/");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  useEffect(() => {
    const storedId = localStorage.getItem("user_id");
    setUserId(storedId);

    if (id) {
      fetchData();
    }
  }, []);

  return (
    <Layout>
      <div className={styles.idQuestion}>
        <h2>Question</h2>
        {question && (
          <QuestionCard
            question={question}
            showDelete={userId === question.user_id}
            onDelete={handleDelete}
          />
        )}
        {error && <p>{error}</p>}
      </div>
   <h2 className={styles.comments}>Answers</h2>
      <div className={styles.idAnswer}>
     
        {answers.map((answer) => (
          <AnswerCard key={answer.id} answer={answer} onUpdate={fetchData} />
        ))}

        {typeof id === "string" && (
          <AnswerForm questionId={id} onNew={fetchData} />
        )}
      </div>
    </Layout>
  );
};

export default QuestionPage;
