import React from 'react';

type ProgressBarProps = {
  current: number;
  total: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = total === 0 ? 0 : (current / total) * 100;


  const getColor = () => {
    if (percentage < 33) return 'bg-gradient-to-r from-red-500 to-red-700';
    if (percentage < 66) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    return 'bg-gradient-to-r from-green-400 to-green-600';
  };

  return (
    <div className="w-full bg-red-200 h-6 rounded-full overflow-hidden relative shadow-lg">
      <div
        className={`h-full transition-all duration-500 ease-in-out ${getColor()}`}
        style={{ width: `${percentage}%` }}
      ></div>
      <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-white drop-shadow-md">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

export default ProgressBar;
