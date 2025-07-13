import styles from "./AnswerCard.module.css";
import { Answer } from "@/types/types";
import axios from "@/axios/axios";
import { useEffect, useState } from "react";

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
        const payload = JSON.parse(atob(token.split(".")[1]));
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
  
  const handleDislike = async () => {
  try {
    await axios.patch(`/answers/${answer.id}/dislike`);
    onUpdate();
  } catch (error) {
    console.error("Dislike error", error);
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
    <main>
      <div className={styles.card}>
        <p>{answer.answer_text}</p>

        <div className={styles.likeDelete}>
          <p>👍 {answer.gained_likes_number}  <button onClick={handleLike} className={styles.likeBtn} >Like</button></p>
          {userId && (
            <div className={styles.btnGroup}>
             
              {userId === answer.user_id && (
                <button onClick={handleDelete} className={styles.deleteBtn}>Delete answer</button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AnswerCard;
