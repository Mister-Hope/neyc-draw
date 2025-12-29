import React, { useState, useCallback, useEffect } from "react";
import { Layout } from "./components/Layout";
import { StartStage } from "./components/StartStage";
import { RoundIntroStage } from "./components/RoundIntroStage";
import { DrawingStage } from "./components/DrawingStage";
import { IntermediateResultsStage } from "./components/IntermediateResultsStage";
import { FinalBlessingStage } from "./components/FinalBlessingStage";
import { ResultsStage } from "./components/ResultsStage";
import { AppStage, Winner } from "./types";
import { PRIZES, MEMBER_LIST, STORAGE_KEY } from "./constants";
import { shuffleArray } from "./utils/lottery";

interface SavedState {
  stage: AppStage;
  remainingMembers: string[];
  winners: Winner[];
  currentPrizeIndex: number;
}

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.START);
  const [remainingMembers, setRemainingMembers] = useState<string[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [currentPrizeIndex, setCurrentPrizeIndex] = useState(0);
  const [hasSavedSession, setHasSavedSession] = useState(false);
  const [lastBatchWinners, setLastBatchWinners] = useState<string[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) setHasSavedSession(true);
  }, []);

  const saveProgress = (
    newStage: AppStage,
    newRemaining: string[],
    newWinners: Winner[],
    newPrizeIndex: number,
  ) => {
    const stateToSave: SavedState = {
      stage: newStage,
      remainingMembers: newRemaining,
      winners: newWinners,
      currentPrizeIndex: newPrizeIndex,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  };

  const handleResume = useCallback(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed: SavedState = JSON.parse(savedData);
        setRemainingMembers(parsed.remainingMembers);
        setWinners(parsed.winners);
        setCurrentPrizeIndex(parsed.currentPrizeIndex);
        setStage(parsed.stage);
      }
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY);
      setHasSavedSession(false);
    }
  }, []);

  const startLottery = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasSavedSession(false);
    const shuffled = shuffleArray(MEMBER_LIST);
    setRemainingMembers(shuffled);
    setWinners([]);
    setCurrentPrizeIndex(0);
    setStage(AppStage.ROUND_INTRO);
    saveProgress(AppStage.ROUND_INTRO, shuffled, [], 0);
  }, []);

  const handleDrawComplete = useCallback(
    (roundWinners: string[]) => {
      const currentPrize = PRIZES[currentPrizeIndex];
      const newWinnersList: Winner[] = roundWinners.map((name) => ({
        name,
        prizeName: currentPrize.name,
        prizeId: currentPrize.id,
      }));

      const updatedWinners = [...winners, ...newWinnersList];
      const updatedRemaining = remainingMembers.filter(
        (m) => !roundWinners.includes(m),
      );

      setWinners(updatedWinners);
      setRemainingMembers(updatedRemaining);
      setLastBatchWinners(roundWinners);

      // 每组抽完后，立即显示中间结果屏
      setStage(AppStage.INTERMEDIATE_RESULTS);
      saveProgress(
        AppStage.INTERMEDIATE_RESULTS,
        updatedRemaining,
        updatedWinners,
        currentPrizeIndex,
      );
    },
    [currentPrizeIndex, winners, remainingMembers],
  );

  const goToNextStep = useCallback(() => {
    const isLastPrize = currentPrizeIndex === PRIZES.length - 1;

    if (isLastPrize) {
      setStage(AppStage.FINAL_BLESSING);
      saveProgress(
        AppStage.FINAL_BLESSING,
        remainingMembers,
        winners,
        currentPrizeIndex,
      );
      return;
    }

    const nextIndex = currentPrizeIndex + 1;
    const nextPrize = PRIZES[nextIndex];
    const currentPrizeObj = PRIZES[currentPrizeIndex];

    setCurrentPrizeIndex(nextIndex);

    // 如果下一组是新的一轮的开始（即 round 变了），进入 ROUND_INTRO
    if (nextPrize.round !== currentPrizeObj.round) {
      setStage(AppStage.ROUND_INTRO);
      saveProgress(AppStage.ROUND_INTRO, remainingMembers, winners, nextIndex);
    } else {
      // 否则（同一轮的 B 组），直接开始抽奖
      setStage(AppStage.DRAWING);
      saveProgress(AppStage.DRAWING, remainingMembers, winners, nextIndex);
    }
  }, [currentPrizeIndex, remainingMembers, winners]);

  const handleRestart = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasSavedSession(false);
    setStage(AppStage.START);
  }, []);

  const currentPrize = PRIZES[currentPrizeIndex];

  return (
    <Layout>
      {stage === AppStage.START && (
        <StartStage
          onStart={startLottery}
          hasSavedSession={hasSavedSession}
          onResume={handleResume}
        />
      )}

      {stage === AppStage.ROUND_INTRO && (
        <RoundIntroStage
          round={currentPrize.round}
          onContinue={() => {
            setStage(AppStage.DRAWING);
            saveProgress(
              AppStage.DRAWING,
              remainingMembers,
              winners,
              currentPrizeIndex,
            );
          }}
        />
      )}

      {stage === AppStage.DRAWING && (
        <DrawingStage
          key={currentPrize.id}
          currentPrize={currentPrize}
          remainingMembers={remainingMembers}
          onDrawComplete={handleDrawComplete}
          isLastPrize={currentPrizeIndex === PRIZES.length - 1}
          onNextStage={goToNextStep}
        />
      )}

      {stage === AppStage.INTERMEDIATE_RESULTS && (
        <IntermediateResultsStage
          prizeName={currentPrize.name}
          winners={lastBatchWinners}
          onNext={goToNextStep}
          isLast={currentPrizeIndex === PRIZES.length - 1}
        />
      )}

      {stage === AppStage.FINAL_BLESSING && (
        <FinalBlessingStage
          onReview={() => setStage(AppStage.RESULTS)}
          onRestart={handleRestart}
        />
      )}

      {stage === AppStage.RESULTS && (
        <ResultsStage winners={winners} onRestart={handleRestart} />
      )}
    </Layout>
  );
};

export default App;
