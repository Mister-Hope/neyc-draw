import React, { useState, useCallback, useEffect } from "react";
import { Layout } from "./components/Layout";
import { StartStage } from "./components/StartStage";
import { DrawingStage } from "./components/DrawingStage";
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

  // Check for saved session on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setHasSavedSession(true);
    }
  }, []);

  // Helper to save current progress
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
      console.error("Failed to load saved session", e);
      // If error, force clear
      localStorage.removeItem(STORAGE_KEY);
      setHasSavedSession(false);
    }
  }, []);

  const startLottery = useCallback(() => {
    // Clear previous session when starting fresh
    localStorage.removeItem(STORAGE_KEY);
    setHasSavedSession(false);

    // 1. Shuffle everyone at the very beginning to ensure random order
    const shuffled = shuffleArray(MEMBER_LIST);
    setRemainingMembers(shuffled);
    setWinners([]);
    setCurrentPrizeIndex(0);
    setStage(AppStage.DRAWING);

    // Initial Save
    saveProgress(AppStage.DRAWING, shuffled, [], 0);
  }, []);

  const handleRoundComplete = useCallback(
    (roundWinners: string[]) => {
      const currentPrize = PRIZES[currentPrizeIndex];

      // Create winner objects
      const newWinnersList: Winner[] = roundWinners.map((name) => ({
        name,
        prizeName: currentPrize.name,
        prizeId: currentPrize.id,
      }));

      const updatedWinners = [...winners, ...newWinnersList];
      const updatedRemaining = remainingMembers.filter(
        (m) => !roundWinners.includes(m),
      );

      // Update State
      setWinners(updatedWinners);
      setRemainingMembers(updatedRemaining);

      // Save Progress immediately
      // Note: We are still at 'DRAWING' stage visually until user clicks next,
      // but the data is committed.
      saveProgress(stage, updatedRemaining, updatedWinners, currentPrizeIndex);
    },
    [currentPrizeIndex, winners, remainingMembers, stage],
  );

  const goToNextStage = useCallback(() => {
    let nextStage = stage;
    let nextIndex = currentPrizeIndex;

    if (currentPrizeIndex < PRIZES.length - 1) {
      nextIndex = currentPrizeIndex + 1;
      setCurrentPrizeIndex(nextIndex);
    } else {
      nextStage = AppStage.RESULTS;
      setStage(AppStage.RESULTS);
    }

    // Save Progress
    saveProgress(nextStage, remainingMembers, winners, nextIndex);
  }, [currentPrizeIndex, remainingMembers, winners, stage]);

  const handleRestart = useCallback(() => {
    // When restarting from Results, we clear storage
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

      {stage === AppStage.DRAWING && (
        <DrawingStage
          key={currentPrize.id} // Re-mount component on prize change to reset internal state
          currentPrize={currentPrize}
          remainingMembers={remainingMembers} // This passes the currently available pool
          onDrawComplete={handleRoundComplete}
          isLastPrize={currentPrizeIndex === PRIZES.length - 1}
          onNextStage={goToNextStage}
        />
      )}

      {stage === AppStage.RESULTS && (
        <ResultsStage winners={winners} onRestart={handleRestart} />
      )}
    </Layout>
  );
};

export default App;
