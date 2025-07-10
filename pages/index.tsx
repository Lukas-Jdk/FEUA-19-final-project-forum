import styles from '../styles/index.module.css';
import Layout from '../components/Layout/Layout';
import { useEffect, useState } from 'react';
import axios from '@/axios/axios';
import { Question } from '@/types/types';
import QuestionCard from '@/components/QuestionCard/QuestionCard';

const HomePage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "answered" | "unanswered">("all");

  const fetchQuestions = async () => {
    try {
      let url = "/questions";
      if (filter === "answered") url = "/questions/filtered?answered=true";
      if (filter === "unanswered") url = "/questions/filtered?answered=false";

      const res = await axios.get(url);
      setQuestions(res.data.questions);
    } catch (error: any) {
      setError("Failed to get questions.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [filter]);

  return (
    <Layout>
      <main className={styles.mainContainer}>
        <div className={styles.cardWrapper}>
          <h1>Question List</h1>

          <div style={{ marginBottom: "1rem" }}>
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("answered")}>Answered</button>
            <button onClick={() => setFilter("unanswered")}>Unanswered</button>
          </div>

          {error && <p>{error}</p>}

          {questions.length === 0 ? (
            <p>There is no questions</p>
          ) : (
            questions.map((q) => <QuestionCard key={q.id} question={q} />)
          )}
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
