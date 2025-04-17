import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState(localStorage.getItem('playerName') || '');
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      localStorage.setItem('playerName', name);
      navigate('/quiz');
    } else {
      alert('Veuillez entrer un nom.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 space-y-6">
      {/* ✅ Card title seule, plus grande */}
      <div className="bg-red-300 text-white text-3xl font-bold rounded-xl shadow-md px-8 py-6 w-full max-w-xl text-center">
        Bienvenue au Quiz
      </div>

      {/* ✅ Card form en dessous */}
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <p className="text-gray-600 text-center mb-6">
          Testez vos connaissances à travers des questions à choix multiples.
          Entrez votre nom pour commencer le quiz et suivez votre progression !
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Entrez votre nom"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleStart}
          className="w-full bg-red-200 hover:bg-red-200 text-white font-semibold py-2 rounded transition duration-200"
        >
          Commencer le Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
