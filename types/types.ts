export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Question {
  id: string;
  question_text: string;
  date: string;
  user_id: string;
}

export interface Answer {
  id: string;
  answer_text: string;
  date: string;
  question_id: string;
  user_id: string;
  gained_likes_number: number;
}
