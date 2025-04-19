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
  userAnswer?: string;
};

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const navigate = useNavigate();

  const name = localStorage.getItem('playerName');
  const quizKey = `quizData_${name}`;

  const shuffle = (array: string[]): string[] =>
    [...array].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (!name) {
      navigate('/');
      return;
    }

    const saved = localStorage.getItem(quizKey);

    if (saved) {
      const parsed = JSON.parse(saved);
      setQuestions(parsed.questions);
      setCurrent(parsed.current);
      setScore(parsed.score);
    } else {
      axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
        .then((res) => {
          const loaded: Question[] = res.data.results.map((q: any) => ({
            ...q,
            answers: shuffle([q.correct_answer, ...q.incorrect_answers]),
          }));
          setQuestions(loaded);
        });
    }
  }, [quizKey]);

  const handleAnswer = (answer: string) => {
    const correct = questions[current].correct_answer;
    const updatedScore = answer === correct ? score + 1 : score;

    const updatedQuestions = questions.map((q, i) =>
      i === current ? { ...q, userAnswer: answer } : q
    );

    const next = current + 1;

    setQuestions(updatedQuestions);
    setScore(updatedScore);
    setCurrent(next);

    localStorage.setItem(quizKey, JSON.stringify({
      current: next,
      score: updatedScore,
      questions: updatedQuestions,
    }));

    if (next >= questions.length) {
      const finalQuestions = updatedQuestions.map((q) => ({
        question: q.question,
        correctAnswer: q.correct_answer,
        userAnswer: q.userAnswer,
      }));

      localStorage.removeItem(quizKey);

      navigate('/result', {
        state: {
          score: updatedScore,
          total: questions.length,
          questions: finalQuestions,
        },
      });
    }
  };

  if (questions.length === 0) {
    return <p className="p-4 text-center">Chargement...</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <button
          onClick={() => navigate('/')}
          className="bg-red-300 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Retour à l'accueil
        </button>
      </div>
      <ProgressBar current={current} total={questions.length} />
      <QuestionCard {...questions[current]} onAnswer={handleAnswer} />
    </div>
  );
};

export default Quiz;
