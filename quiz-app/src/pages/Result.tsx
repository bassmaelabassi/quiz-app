import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };
  const name = localStorage.getItem('playerName');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Félicitations, {name}!</h1>
      <p className="text-xl mb-4">Vous avez obtenu {score} / {total}</p>
      <button
        onClick={() => navigate('/')}
        className="bg-red-300 text-white px-4 py-2 rounded"
      >
        Rejouer
      </button>
    </div>
  );
};

export default Result;
