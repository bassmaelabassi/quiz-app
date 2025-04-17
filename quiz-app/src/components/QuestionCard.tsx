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
            className="bg-red-300 text-white px-4 py-2 rounded hover:bg-red-200"
            onClick={() => onAnswer(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;