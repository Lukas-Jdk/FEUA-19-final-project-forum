import styles from './AnswerCard.module.css';
import { Answer } from '@/types/types';
import axios from '@/axios/axios';

interface Props {
  answer: Answer;
  onUpdate: () => void;
}

const AnswerCard = ({answer, onUpdate}: Props) => {

  const handleLike = async () => {
    try {
      await axios.patch(`/answers/${answer.id}/like`);
      onUpdate();
    } catch(error) {
      console.error("Like error", error)
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
      <p>👍{answer.gained_likes_number}</p>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default AnswerCard