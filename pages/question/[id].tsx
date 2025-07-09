import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Answer, Question } from "@/types/types";
import axios from "axios";
import Layout from "@/components/Layout/Layout";

const QuestionPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const qRes = await axios.get(`/questions`);
      const selected = qRes.data.questions.find((q: Question) => q.id === id);
      setQuestion(selected);

      const aRes = await axios.get(`/question/${id}/answers`);
      setAnswers(aRes.data.answers);
    } catch (err) {
      setError("Failed to get data");
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  return (
    <Layout>
   <main></main>
    </Layout>
  );
};

export default QuestionPage;
