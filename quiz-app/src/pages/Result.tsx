import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [location, navigate]);

  const { score = 0, total = 0, questions = [] } = location.state || {};
  const name = localStorage.getItem('playerName');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-purple-200 p-4">
      <div className="bg-red-100 shadow-xl rounded-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Félicitations, {name} !
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Vous avez obtenu <span className="font-semibold text-red-600">{score}</span> / {total}
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Les bonnes réponses :</h2>
        <ul className="text-left space-y-4 mb-6">
          {Array.isArray(questions) && questions.length > 0 ? (
            questions.map((q: any, index: number) => (
              <li key={index} className="bg-white p-4 rounded-xl shadow">
                <p className="font-semibold text-gray-700">Q{index + 1}: {q.question}</p>
                <p className="text-green-600">✅ Réponse correcte: {q.correctAnswer}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Aucune question à afficher.</p>
          )}
        </ul>

        <button
          onClick={() => navigate('/')}
          className="bg-red-300 hover:bg-red-200 transition-colors text-white font-medium px-6 py-3 rounded-full shadow-md"
        >
          Rejouer
        </button>
      </div>
    </div>
  );
};

export default Result;
