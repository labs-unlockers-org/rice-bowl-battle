import React, { useState } from 'react';
import { DateInput } from './components/DateInput';
import { RiceBowlResult } from './components/RiceBowlResult';
import { calculateRiceBowls } from './utils/calculateRiceBowls';
import { getRandomMessage } from './utils/messages';
import { Soup, Swords, Play, RotateCcw } from 'lucide-react';

function App() {
  const [myName, setMyName] = useState('');
  const [myBirthDate, setMyBirthDate] = useState('');
  const [opponentName, setOpponentName] = useState('');
  const [opponentBirthDate, setOpponentBirthDate] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  const myBowls = myBirthDate ? calculateRiceBowls(new Date(myBirthDate)) : 0;
  const opponentBowls = opponentBirthDate ? calculateRiceBowls(new Date(opponentBirthDate)) : 0;
  const difference = Math.abs(myBowls - opponentBowls);

  const handleStart = () => {
    if (!myBirthDate || !opponentBirthDate) {
      alert('두 사람의 생년월일을 모두 입력해주세요!');
      return;
    }
    setIsStarted(true);
  };

  const handleReset = () => {
    setIsStarted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Soup className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">밥그릇 대결</h1>
            <Soup className="h-12 w-12 text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg">
            태어난 날부터 지금까지 먹은 밥그릇 수로 대결해보세요!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 왼쪽: 내 정보 */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">나의 정보</h2>
              <input
                type="text"
                placeholder="내 이름"
                value={myName}
                onChange={(e) => setMyName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                disabled={isStarted}
              />
              <DateInput
                label="내 생년월일"
                value={myBirthDate}
                onChange={setMyBirthDate}
                disabled={isStarted}
              />
              {isStarted && (
                <RiceBowlResult
                  name={myName || '나'}
                  bowls={myBowls}
                  isWinner={myBowls > opponentBowls}
                />
              )}
            </div>
          </div>

          {/* 오른쪽: 상대방 정보 */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-red-600 text-center mb-4">상대방 정보</h2>
              <input
                type="text"
                placeholder="상대방 이름"
                value={opponentName}
                onChange={(e) => setOpponentName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
                disabled={isStarted}
              />
              <DateInput
                label="상대방 생년월일"
                value={opponentBirthDate}
                onChange={setOpponentBirthDate}
                theme="red"
                disabled={isStarted}
              />
              {isStarted && (
                <RiceBowlResult
                  name={opponentName || '상대방'}
                  bowls={opponentBowls}
                  isWinner={opponentBowls > myBowls}
                  theme="red"
                />
              )}
            </div>
          </div>
        </div>

        {/* 시작/다시하기 버튼 */}
        <div className="mt-8 flex justify-center">
          {!isStarted ? (
            <button
              onClick={handleStart}
              className="group relative bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Play className="h-6 w-6" />
                <span>대결 시작!</span>
              </div>
              <div className="absolute inset-0 -z-10 bg-blue-600 rounded-full blur-lg group-hover:blur-xl opacity-50 transition-all duration-200"></div>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="group relative bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <RotateCcw className="h-6 w-6" />
                <span>다시 대결!</span>
              </div>
              <div className="absolute inset-0 -z-10 bg-yellow-600 rounded-full blur-lg group-hover:blur-xl opacity-50 transition-all duration-200"></div>
            </button>
          )}
        </div>

        {/* VS 표시 및 결과 */}
        {isStarted && (
          <div className="mt-8">
            <div className="flex justify-center items-center mb-6">
              <Swords className="h-16 w-16 text-gray-600 animate-pulse" />
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
              <p className="text-center text-xl text-yellow-800 font-medium">
                {difference.toLocaleString()} 그릇 차이가 나네요!
                <span className="block mt-3 text-2xl">
                  {getRandomMessage(
                    myBowls < opponentBowls ? opponentName || '상대방' : myName || '나',
                    myBowls > opponentBowls ? opponentName || '상대방' : myName || '나',
                    difference
                  )}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;