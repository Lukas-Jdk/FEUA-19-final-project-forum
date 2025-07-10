import styles from './AnswerCard.module.css';
import { Answer } from '@/types/types';
import axios from '@/axios/axios';
import { useEffect, useState } from 'react';

interface Props {
  answer: Answer;
  onUpdate: () => void;
}

const AnswerCard = ({ answer, onUpdate }: Props) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload.userId);
      } catch (e) {
        console.error("Token decode error", e);
      }
    }
  }, []);

  const handleLike = async () => {
    try {
      await axios.patch(`/answers/${answer.id}/like`);
      onUpdate();
    } catch (error) {
      console.error("Like error", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/answer/${answer.id}`);
      onUpdate();
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  return (
    <div className={styles.card}>
      <p>{answer.answer_text}</p>
      <p>👍 {answer.gained_likes_number}</p>

      {userId && (
        <div className={styles.btnGroup}>
          <button onClick={handleLike}>Like</button>
          {userId === answer.user_id && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default AnswerCard;
