import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };
  const name = localStorage.getItem('playerName');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">
          Félicitations, {name} !
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Vous avez obtenu <span className="font-semibold text-green-600">{score}</span> / {total}
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-medium px-6 py-3 rounded-full shadow-md"
        >
          Rejouer
        </button>
      </div>
    </div>
  );
};

export default Result;
