import styles from '../styles/index.module.css'
import Layout from '../components/Layout/Layout';
import {useEffect, useState} from 'react';
import axios from '@/axios/axios';
import { Question } from '@/types/types';
import QuestionCard from '@/components/QuestionCard/QuestionCard';

const HomePage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/questions");
        setQuestions(res.data.questions);
      } catch (error: any) {
        setError("Failed by getting questions.");
        console.error(error)
      }
    };
    fetchQuestions();
  },[]);

  return (
    <Layout>
      <main className={styles.mainContainer}>
        <div className={styles.cardWrapper}>
          <h1>Question List</h1>
          {error && <p>{error}</p>}
          {questions.length === 0 ? (
            <p>There is no questions</p>
          ) : (
            questions.map((q) => <QuestionCard key={q.id} question={q}/>)
          )}

        </div>
      </main>

    </Layout>
  )
}

export default HomePage