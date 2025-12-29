import React from "react";
import { Winner } from "../types";
import { PRIZES } from "../constants";

interface ResultsStageProps {
  winners: Winner[];
  onRestart: () => void;
}

export const ResultsStage: React.FC<ResultsStageProps> = ({
  winners,
  onRestart,
}) => {
  // Group winners by prize
  const winnersByPrize = PRIZES.map((prize) => ({
    ...prize,
    winners: winners.filter((w) => w.prizeId === prize.id).map((w) => w.name),
  }));

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center animate-fade-in pb-10">
      <h2 className="text-4xl md:text-5xl font-bold text-festival-gold font-serif mb-8 drop-shadow-lg text-center">
        🏆 恭喜所有获奖者 🏆
      </h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 px-4">
        {winnersByPrize.map((group) => (
          <div
            key={group.id}
            className="bg-red-900/60 border border-yellow-500/30 rounded-2xl overflow-hidden shadow-xl flex flex-col"
          >
            <div className="bg-red-950/80 p-3 border-b border-yellow-500/20 text-center">
              <h3 className="text-xl font-bold text-yellow-400">
                {group.name}
              </h3>
              <span className="text-xs text-red-200 block mt-1">
                {group.description}
              </span>
            </div>

            <div className="p-4 flex-1 overflow-y-auto max-h-[300px] scrollbar-thin">
              <div className="flex flex-wrap gap-2 justify-center">
                {group.winners.map((name, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2 py-1 bg-red-800 rounded text-sm text-white font-medium whitespace-nowrap"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-red-950/50 p-2 text-center text-xs text-gray-400">
              共 {group.winners.length} 人
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="px-8 py-3 text-lg font-bold text-red-300 border border-red-300/50 rounded-full hover:bg-red-900/50 hover:text-white transition-colors"
      >
        重新开始
      </button>
    </div>
  );
};
