import React from 'react';

type QuestionCardProps = {
  question: string;
  answers: string[];
  onAnswer: (answer: string) => void;
};

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answers, onAnswer }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl mb-4" dangerouslySetInnerHTML={{ __html: question }} />
      <div className="grid gap-2">
        {answers.map((answer, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => onAnswer(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
            aria-label={`Answer ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
