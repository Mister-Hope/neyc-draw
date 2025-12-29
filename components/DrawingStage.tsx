import React, { useState, useEffect, useRef } from "react";
import { PrizeCategory } from "../types";
import { getRandomSubset } from "../utils/lottery";

interface ExtendedPrize extends PrizeCategory {
  round: number;
  groupInRound: "A" | "B";
}

interface DrawingStageProps {
  currentPrize: ExtendedPrize;
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
  // 记录当前已经“定格”的卡片数量
  const [lockedCount, setLockedCount] = useState(0);

  const shuffleIntervalRef = useRef<number | null>(null);
  const revealIntervalRef = useRef<number | null>(null);
  const finalWinnersRef = useRef<string[]>([]);
  const lockedCountRef = useRef(0);

  // 初始化占位符
  useEffect(() => {
    const placeholders = Array(currentPrize.count).fill("虚位以待");
    setDisplayNames(placeholders);
    setLockedCount(0);
    lockedCountRef.current = 0;

    return () => clearAllIntervals();
  }, [currentPrize.count, currentPrize.id]);

  const clearAllIntervals = () => {
    if (shuffleIntervalRef.current) clearInterval(shuffleIntervalRef.current);
    if (revealIntervalRef.current) clearInterval(revealIntervalRef.current);
  };

  const startRolling = () => {
    if (isRolling) return;
    setIsRolling(true);
    setHasDrawn(false);
    setLockedCount(0);
    lockedCountRef.current = 0;

    // 1. 启动滚动效果（更新所有未锁定的卡片）
    shuffleIntervalRef.current = window.setInterval(() => {
      setDisplayNames((prev) => {
        const next = [...prev];
        // 只随机更新还未锁定的位置 (从 lockedCountRef.current 开始到结束)
        const startIndex = lockedCountRef.current;
        const countNeeded = currentPrize.count - startIndex;

        if (countNeeded > 0) {
          const randomNames = getRandomSubset(remainingMembers, countNeeded);
          for (let i = 0; i < countNeeded; i++) {
            next[startIndex + i] = randomNames[i];
          }
        }
        return next;
      });
    }, 50); // 滚动速度

    // 2. 2.5秒后开始逐个揭晓
    setTimeout(() => {
      startRevealing();
    }, 2500);
  };

  const startRevealing = () => {
    // 确定最终中奖名单
    const winners = remainingMembers.slice(0, currentPrize.count);
    finalWinnersRef.current = winners;

    // 启动揭晓定时器
    // 逐个定格的速度
    const revealSpeed = currentPrize.count > 20 ? 100 : 150;

    revealIntervalRef.current = window.setInterval(() => {
      const currentIdx = lockedCountRef.current;

      if (currentIdx >= currentPrize.count) {
        // 全部揭晓完毕
        finishDrawing();
        return;
      }

      // 锁定当前位置的名字 (直接修改 state 中的那一个位置)
      // 注意：这里我们依靠 shuffleInterval 来停止更新这个位置，
      // 同时强制将这个位置设置为最终赢家
      setDisplayNames((prev) => {
        const next = [...prev];
        next[currentIdx] = finalWinnersRef.current[currentIdx];
        return next;
      });

      // 更新锁定计数，shuffleInterval 将不再更新此索引
      lockedCountRef.current += 1;
      setLockedCount(lockedCountRef.current);
    }, revealSpeed);
  };

  const finishDrawing = () => {
    clearAllIntervals();
    setIsRolling(false);
    setHasDrawn(true);
    // 确保最终展示完全正确
    setDisplayNames(finalWinnersRef.current);
    onDrawComplete(finalWinnersRef.current);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center py-6 animate-fade-in">
      {/* 轮次与奖项标题 */}
      <div className="text-center mb-10 relative">
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="px-8 py-2 rounded-full bg-red-900 border border-festival-gold/50 text-festival-gold text-xl font-bold shadow-lg">
            第 {currentPrize.round} 轮
          </div>
          <div className="px-8 py-2 rounded-full bg-red-900 border border-festival-gold/50 text-festival-gold text-xl font-bold shadow-lg">
            {currentPrize.groupInRound === "A" ? "第 1 组" : "第 2 组"}
          </div>
        </div>

        <h2 className="text-6xl md:text-8xl font-black text-white mb-2 font-serif animate-text-glow tracking-tight">
          {currentPrize.name}
        </h2>

        <p className="text-3xl text-yellow-200/90 font-serif mb-6 tracking-wide drop-shadow-md">
          “ {currentPrize.description} ”
        </p>

        <p className="text-xl text-festival-gold-glow italic font-serif flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-festival-gold/40"></span>
          本组将抽取 {currentPrize.count} 位幸运嘉宾
          <span className="h-px w-12 bg-festival-gold/40"></span>
        </p>
      </div>

      {/* 抽奖展示区 */}
      <div className="w-full bg-gradient-to-b from-black/70 to-red-950/40 backdrop-blur-2xl rounded-[40px] p-8 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] mb-10 min-h-[480px] flex flex-col justify-center relative overflow-hidden">
        {/* 四角装饰 */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-festival-gold/20 rounded-tl-[40px]"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-festival-gold/20 rounded-br-[40px]"></div>

        <div
          className={`grid gap-5 transition-all duration-500 ${
            currentPrize.count > 20
              ? "grid-cols-4 sm:grid-cols-6 md:grid-cols-8"
              : "grid-cols-3 sm:grid-cols-4 md:grid-cols-5"
          }`}
        >
          {displayNames.map((name, idx) => {
            // 判断该卡片是否已经“定格”
            // 只有当 isRolling 为 true，且 idx 小于 lockedCount 时，才算抽奖过程中的“定格”
            // 当 isRolling 为 false (抽奖彻底结束) 时，所有卡片都是定格状态
            const isLocked =
              (!isRolling && hasDrawn) || (isRolling && idx < lockedCount);
            const isWaiting = !isRolling && !hasDrawn; // 初始状态

            return (
              <div
                key={idx}
                className={`
                  draw-card relative overflow-hidden aspect-square rounded-2xl flex items-center justify-center p-2 text-center shadow-xl border transition-all duration-300 transform-gpu
                  ${
                    isWaiting
                      ? "bg-black/50 border-yellow-500/20 animate-inner-glow"
                      : isLocked
                        ? "bg-gradient-to-br from-red-600 via-red-700 to-red-900 border-festival-gold shadow-[0_0_25px_rgba(220,38,38,0.4)] scale-100 z-10"
                        : "bg-red-900/40 border-white/10 scale-95 blur-[0.5px]" // 滚动状态
                  }
                `}
              >
                <span
                  className={`
                  font-bold transition-all duration-300 tracking-tight
                  ${
                    name === "虚位以待"
                      ? "text-yellow-100/40 text-lg md:text-xl"
                      : "text-white text-xl md:text-2xl drop-shadow-lg font-black"
                  }
                  ${isLocked ? "scale-110" : "scale-100"}
                `}
                >
                  {name}
                </span>

                {/* 刚刚定格时的闪光效果 */}
                {isLocked && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 translate-x-[-150%] animate-shine pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 操作按钮区 */}
      <div className="flex flex-col items-center gap-6">
        {!isRolling && !hasDrawn && (
          <button
            onClick={startRolling}
            className="group relative px-24 py-6 text-4xl font-black text-red-900 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 rounded-full shadow-[0_15px_40px_rgba(252,211,77,0.5)] hover:scale-110 active:scale-95 transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10">开启</span>
            <div className="absolute inset-0 bg-white/30 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12"></div>
          </button>
        )}

        {isRolling && (
          <div className="px-20 py-6 text-3xl font-black bg-black/60 text-festival-gold rounded-full border-2 border-festival-gold/50 backdrop-blur-xl animate-pulse shadow-2xl flex items-center gap-4">
            <span className="animate-bounce">🏮</span>
            正在为您揭晓...
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              🏮
            </span>
          </div>
        )}

        {hasDrawn && (
          <button
            onClick={onNextStage}
            className="group px-16 py-5 text-2xl font-black bg-red-700 border-4 border-yellow-400 text-white rounded-full shadow-[0_15px_45px_rgba(185,28,28,0.5)] hover:bg-red-600 hover:scale-105 active:scale-95 transform-gpu transition-all duration-700 flex items-center gap-4"
          >
            {currentPrize.groupInRound === "A"
              ? "继续第 2 组"
              : isLastPrize
                ? "完成全部抽奖"
                : `结束第 ${currentPrize.round} 轮`}
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
