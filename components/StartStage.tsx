import React from "react";
import { APP_TITLE, SUB_TITLE, MEMBER_LIST } from "../constants";

interface StartStageProps {
  onStart: () => void;
  hasSavedSession: boolean;
  onResume: () => void;
}

export const StartStage: React.FC<StartStageProps> = ({
  onStart,
  hasSavedSession,
  onResume,
}) => {
  const requestFullscreen = () => {
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
      docEl
        .requestFullscreen()
        .catch((err) => console.log("Fullscreen request failed", err));
    }
  };

  const handleStart = () => {
    requestFullscreen();
    onStart();
  };

  const handleResume = () => {
    requestFullscreen();
    onResume();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[80vh] animate-fade-in-up">
      <div className="mb-10 text-center">
        {/* Removed animate-float from subtitle */}
        <h2 className="text-2xl md:text-4xl text-festival-gold font-serif mb-4 tracking-widest opacity-90">
          {SUB_TITLE}
        </h2>
        <h1 className="text-5xl md:text-8xl font-black text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] tracking-tighter animate-text-glow">
          {APP_TITLE}
        </h1>
      </div>

      <div className="bg-white/10 backdrop-blur-md p-10 rounded-[40px] border-2 border-festival-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center max-w-2xl w-full relative overflow-hidden">
        {/* Decorative elements inside the box */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

        <p className="text-2xl text-gray-200 mb-8 text-center relative z-10">
          共有{" "}
          <span className="text-festival-gold font-black text-5xl drop-shadow-sm px-2">
            {MEMBER_LIST.length}
          </span>{" "}
          位家人们参与
        </p>

        <p className="text-xl text-yellow-100/80 mb-10 text-center italic font-serif relative z-10">
          “ 每一个名字都承载着一年的喜悦 ”
        </p>

        <div className="flex flex-col gap-6 w-full max-w-xs relative z-10">
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center justify-center px-12 py-6 text-3xl font-black text-red-900 transition-all duration-300 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 rounded-full shadow-[0_15px_30px_rgba(252,211,77,0.4)] hover:shadow-yellow-400/60 hover:scale-110 active:scale-95 w-full overflow-hidden"
          >
            <span className="relative z-10">开启大奖</span>
            <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
          </button>

          {hasSavedSession && (
            <button
              onClick={handleResume}
              className="inline-flex items-center justify-center px-12 py-4 text-xl font-bold text-yellow-200 transition-all duration-200 bg-black/40 border-2 border-yellow-500/20 rounded-full hover:bg-black/60 hover:text-white hover:border-yellow-400/50 shadow-lg w-full animate-pulse-fast"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                ></path>
              </svg>
              继续上轮抽奖
            </button>
          )}
        </div>
      </div>

      <p className="mt-12 text-gray-400/60 text-sm tracking-widest uppercase">
        点击上方按钮后将自动进入全屏模式
      </p>
    </div>
  );
};
