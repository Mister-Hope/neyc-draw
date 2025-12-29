import React from "react";
import { Winner } from "../types";
import { SUB_TITLE } from "../constants";

interface IntermediateResultsStageProps {
  prizeName: string;
  winners: string[];
  onNext: () => void;
  isLast: boolean;
}

export const IntermediateResultsStage: React.FC<
  IntermediateResultsStageProps
> = ({ prizeName, winners, onNext, isLast }) => {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center animate-fade-in py-10">
      <div className="text-center mb-8">
        <h3 className="text-2xl text-festival-gold mb-2 font-bold tracking-widest opacity-80 font-serif">
          {SUB_TITLE}
        </h3>
        <h2 className="text-6xl md:text-7xl font-black text-white font-serif drop-shadow-lg tracking-tight mb-2">
          {prizeName} <span className="text-festival-gold">·</span> 获奖名单
        </h2>
        <div className="h-1 w-48 bg-gradient-to-r from-transparent via-festival-gold to-transparent mx-auto mt-4 opacity-50"></div>
      </div>

      <div className="w-full bg-black/40 backdrop-blur-2xl rounded-[40px] p-10 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] mb-12 relative overflow-hidden">
        {/* Decorative watermark */}
        <div className="absolute -bottom-10 -right-10 text-[200px] font-black text-white/5 select-none pointer-events-none font-serif leading-none">
          喜
        </div>

        <div
          className={`grid gap-5 ${
            winners.length > 20
              ? "grid-cols-4 sm:grid-cols-6 md:grid-cols-8"
              : "grid-cols-3 sm:grid-cols-4 md:grid-cols-5"
          }`}
        >
          {winners.map((name, idx) => (
            <div
              key={idx}
              className="draw-card relative overflow-hidden aspect-square rounded-2xl flex items-center justify-center p-2 text-center bg-gradient-to-br from-red-600 via-red-700 to-red-900 border border-festival-gold shadow-xl transition-transform duration-500"
            >
              <span className="text-white text-xl md:text-2xl font-black drop-shadow-md z-10">
                {name}
              </span>

              {/* 华丽的扫光效果 */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-150%] animate-shine pointer-events-none"></div>

              {/* 背景微光 */}
              <div className="absolute inset-0 bg-red-400/10 mix-blend-overlay"></div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        className="group px-20 py-6 text-2xl font-black bg-gradient-to-b from-red-600 to-red-800 border-2 border-festival-gold/60 text-white rounded-full shadow-[0_15px_40px_rgba(185,28,28,0.4)] hover:scale-110 active:scale-95 transition-all duration-500 flex items-center gap-4"
      >
        <span className="relative">
          {isLast ? "送出最后一份福气" : "开启后续奖项"}
        </span>
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
    </div>
  );
};
