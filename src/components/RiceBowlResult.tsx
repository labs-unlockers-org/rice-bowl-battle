import React from 'react';
import { Soup } from 'lucide-react';
import { formatNumber } from '../utils/calculateRiceBowls';

interface RiceBowlResultProps {
  name: string;
  bowls: number;
  isWinner: boolean;
  theme?: 'blue' | 'red';
}

export function RiceBowlResult({ name, bowls, isWinner, theme = 'blue' }: RiceBowlResultProps) {
  const themeColor = theme === 'red' ? 'red' : 'blue';

  return (
    <div className={`p-6 rounded-lg ${isWinner ? `bg-${themeColor}-100` : 'bg-gray-100'}`}>
      <div className="flex items-center gap-2 mb-2">
        <Soup className={`h-6 w-6 ${isWinner ? `text-${themeColor}-600` : 'text-gray-600'}`} />
        <span className="text-lg font-semibold">{name}의 밥그릇 수</span>
      </div>
      <div className="text-3xl font-bold">
        {formatNumber(bowls)}
        <span className="text-lg ml-2">그릇</span>
      </div>
      {isWinner && (
        <div className={`mt-2 text-${themeColor}-600 font-medium`}>
          🏆 승리자!
        </div>
      )}
    </div>
  );
}