import React from 'react';

type ProgressBarProps = {
  current: number;
  total: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full bg-gray-300 h-4 rounded">
      <div className="bg-red-300 h-4 rounded" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;