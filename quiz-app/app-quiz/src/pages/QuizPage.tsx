import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import { useNavigate } from 'react-router-dom';

type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
};

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((res) => {
        const loaded: Question[] = res.data.results.map((q: any) => ({
          ...q,
          answers: shuffle([q.correct_answer, ...q.incorrect_answers]),
        }));
        setQuestions(loaded);
      });
  }, []);

  const shuffle = (array: string[]): string[] =>
    [...array].sort(() => Math.random() - 0.5);

  const handleAnswer = (answer: string) => {
    const correct = questions[current].correct_answer;
    if (answer === correct) {
      setScore((prev) => prev + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      navigate('/result', {
        state: { score: answer === correct ? score + 1 : score, total: questions.length },
      });
    }
  };

  if (questions.length === 0) {
    return <p className="p-4 text-center">Chargement...</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <ProgressBar current={current} total={questions.length} />
      <QuestionCard {...questions[current]} onAnswer={handleAnswer} />
    </div>
  );
};

export default QuizPage;
