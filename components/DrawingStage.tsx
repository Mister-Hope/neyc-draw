import React, { useState, useEffect, useRef } from "react";
import { PrizeCategory } from "../types";
import { getRandomSubset } from "../utils/lottery";

interface DrawingStageProps {
  currentPrize: PrizeCategory;
  remainingMembers: string[];
  onDrawComplete: (winners: string[]) => void;
  isLastPrize: boolean;
  onNextStage: () => void;
}

export const DrawingStage: React.FC<DrawingStageProps> = ({
  currentPrize,
  remainingMembers,
  onDrawComplete,
  isLastPrize,
  onNextStage,
}) => {
  const [isRolling, setIsRolling] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [displayNames, setDisplayNames] = useState<string[]>([]);
  const rollingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!hasDrawn && !isRolling) {
      setDisplayNames(Array(currentPrize.count).fill("虚位以待"));
    }
  }, [currentPrize.count, hasDrawn, isRolling]);

  const startRolling = () => {
    setIsRolling(true);
    setHasDrawn(false);

    rollingIntervalRef.current = window.setInterval(() => {
      setDisplayNames(getRandomSubset(remainingMembers, currentPrize.count));
    }, 60);

    setTimeout(() => {
      stopRolling();
    }, 3000);
  };

  const stopRolling = () => {
    if (rollingIntervalRef.current !== null) {
      clearInterval(rollingIntervalRef.current);
      rollingIntervalRef.current = null;
    }

    const winners = remainingMembers.slice(0, currentPrize.count);
    setDisplayNames(winners);
    setIsRolling(false);
    setHasDrawn(true);
    onDrawComplete(winners);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center py-6 animate-fade-in">
      {/* Header Info */}
      <div className="text-center mb-10 relative">
        <div className="inline-block px-8 py-2 rounded-full bg-red-900/40 border border-festival-gold/30 text-festival-gold text-lg mb-4 backdrop-blur-md shadow-lg">
          本轮抽取人数：
          <span className="font-black text-2xl">{currentPrize.count}</span> 位
        </div>

        <h2 className="text-6xl md:text-8xl font-black text-white mb-4 font-serif animate-text-glow tracking-tight">
          {currentPrize.name}
        </h2>

        <p className="text-2xl text-festival-gold-glow italic font-serif flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-festival-gold/40"></span>
          {currentPrize.description}
          <span className="h-px w-8 bg-festival-gold/40"></span>
        </p>
      </div>

      {/* Main Drawing Area */}
      <div className="w-full bg-gradient-to-b from-black/60 to-red-950/30 backdrop-blur-xl rounded-[40px] p-8 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] mb-10 min-h-[480px] flex flex-col justify-center relative overflow-hidden">
        {/* Corner Decor */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-festival-gold/30 rounded-tl-[40px]"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-festival-gold/30 rounded-br-[40px]"></div>

        <div
          className={`grid gap-4 transition-all duration-500 ${
            currentPrize.count > 20
              ? "grid-cols-4 sm:grid-cols-6 md:grid-cols-8"
              : "grid-cols-3 sm:grid-cols-4 md:grid-cols-5"
          }`}
        >
          {displayNames.map((name, idx) => (
            <div
              key={idx}
              className={`
                draw-card relative overflow-hidden aspect-square rounded-2xl flex items-center justify-center p-2 text-center shadow-xl border transition-all duration-300 transform-gpu
                ${
                  isRolling
                    ? "bg-red-900/40 border-white/10 scale-95 blur-[0.5px]"
                    : name === "虚位以待"
                      ? "bg-black/40 border-yellow-500/20 animate-inner-glow"
                      : "bg-gradient-to-br from-red-600 via-red-700 to-red-900 border-festival-gold shadow-[0_0_20px_rgba(220,38,38,0.5)] scale-100"
                }
                ${!isRolling && hasDrawn ? "animate-bounce-custom" : ""}
              `}
              style={{
                animationDelay: !isRolling && hasDrawn ? `${idx * 40}ms` : "0s",
              }}
            >
              {/* Background watermark for placeholder */}
              {name === "虚位以待" && (
                <span className="absolute inset-0 flex items-center justify-center text-5xl font-black text-white/5 pointer-events-none select-none">
                  福
                </span>
              )}

              <span
                className={`
                font-bold transition-all duration-300 tracking-tight
                ${
                  name === "虚位以待"
                    ? "text-yellow-100 text-lg md:text-xl opacity-100 drop-shadow-[0_0_15px_rgba(252,211,77,0.9)]"
                    : isRolling
                      ? "text-gray-200 text-lg md:text-xl"
                      : "text-white text-xl md:text-2xl drop-shadow-lg font-black"
                }
              `}
              >
                {name}
              </span>

              {!isRolling && hasDrawn && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 translate-x-[-150%] animate-shine pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-6">
        {!hasDrawn && !isRolling && (
          <button
            onClick={startRolling}
            className="group relative px-24 py-6 text-4xl font-black text-red-900 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 rounded-full shadow-[0_0_40px_rgba(252,211,77,0.5)] hover:shadow-[0_0_70px_rgba(252,211,77,0.8)] hover:scale-110 active:scale-95 flex items-center gap-4 overflow-hidden transform-gpu transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)"
          >
            <span className="relative z-10">开始抽奖</span>
            <div className="w-12 h-12 bg-red-900/10 rounded-full flex items-center justify-center relative z-10 group-hover:bg-red-900/20 transition-all duration-500">
              <svg
                className="w-7 h-7 animate-pulse"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
            </div>
            {/* Smooth Shine Sweep */}
            <div className="absolute inset-0 bg-white/30 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12"></div>
          </button>
        )}

        {isRolling && (
          <div className="px-16 py-6 text-3xl font-black bg-black/50 text-festival-gold rounded-full border-2 border-festival-gold/50 backdrop-blur-md animate-pulse shadow-2xl flex items-center gap-4">
            <span className="animate-bounce">🏮</span>
            正在揭晓幸运儿...
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              🏮
            </span>
          </div>
        )}

        {hasDrawn && (
          <button
            onClick={onNextStage}
            className="group px-14 py-5 text-2xl font-black bg-red-600 border-4 border-yellow-400 text-white rounded-full shadow-[0_10px_40px_rgba(220,38,38,0.6)] hover:bg-red-500 hover:scale-105 active:scale-95 transform-gpu transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) flex items-center gap-4"
          >
            {isLastPrize ? "查看最终大榜" : "准备下一轮"}
            <svg
              className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
