import React from "react";

interface FinalBlessingStageProps {
  onReview: () => void;
  onRestart: () => void;
}

export const FinalBlessingStage: React.FC<FinalBlessingStageProps> = ({
  onReview,
  onRestart,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in text-center">
      <div className="w-40 h-40 bg-red-600 rounded-full border-4 border-festival-gold flex items-center justify-center shadow-[0_0_50px_rgba(252,211,77,0.4)] mb-10 animate-float">
        <span className="text-[100px] font-serif text-festival-gold font-bold">
          福
        </span>
      </div>

      <h1 className="text-6xl md:text-8xl font-black text-white mb-6 font-serif tracking-tight">
        福气已全部送完
      </h1>

      <p className="text-3xl text-festival-gold-glow mb-16 italic font-serif">
        祝愿每一位家人马年大吉，万事如意！
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={onReview}
          className="px-12 py-5 text-xl font-bold text-white bg-black/40 border-2 border-festival-gold/30 rounded-full hover:bg-black/60 transition-all shadow-lg"
        >
          回顾抽奖结果
        </button>

        <button
          onClick={onRestart}
          className="px-12 py-5 text-xl font-bold text-red-300 hover:text-white transition-colors"
        >
          返回首页
        </button>
      </div>
    </div>
  );
};
