import React from "react";

interface RoundIntroStageProps {
  round: number;
  onContinue: () => void;
}

export const RoundIntroStage: React.FC<RoundIntroStageProps> = ({
  round,
  onContinue,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in text-center">
      <div className="mb-6 px-8 py-2 bg-festival-gold/20 border border-festival-gold/50 rounded-full text-festival-gold text-2xl font-bold animate-pulse">
        即将开启
      </div>

      <h1 className="text-7xl md:text-9xl font-black text-white mb-12 font-serif animate-text-glow tracking-tighter">
        现在开始第 <span className="text-festival-gold">{round}</span> 轮抽奖
      </h1>

      <p className="text-2xl text-yellow-100/70 mb-16 italic font-serif">
        “ 锦绣前程，好运连连 ”
      </p>

      <button
        onClick={onContinue}
        className="group relative px-20 py-6 text-3xl font-black text-red-900 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 rounded-full shadow-[0_0_50px_rgba(252,211,77,0.4)] hover:scale-110 active:scale-95 transition-all duration-500 overflow-hidden"
      >
        <span className="relative z-10">开始本轮抽奖</span>
        <div className="absolute inset-0 bg-white/30 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12"></div>
      </button>
    </div>
  );
};
