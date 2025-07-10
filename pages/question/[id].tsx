import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Answer, Question } from "@/types/types";
import axios from "@/axios/axios";
import Layout from "@/components/Layout/Layout";
import AnswerCard from "@/components/AnswerCard/AnswerCard";
import AnswerForm from "@/components/AnswerForm/AnswerForm";

const QuestionPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      // 1. Gauti visus klausimus ir rasti pagal ID
      const qRes = await axios.get("/questions");
      const selected = qRes.data.questions.find((q: Question) => q.id === String(id));
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

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  return (
    <Layout>
      <div style={{ padding: "2rem" }}>
        {error && <p>{error}</p>}
        {question && (
          <>
            <h2>{question.question_text}</h2>
            <p>{new Date(question.date).toLocaleDateString()}</p>
            <p>User: {question.user_id}</p>
          </>
        )}

        <h2>Answers</h2>
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
