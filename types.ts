export interface PrizeCategory {
  id: number;
  name: string;
  count: number;
  description: string;
  round: number;
  groupInRound: "A" | "B";
}

export interface Winner {
  name: string;
  prizeName: string;
  prizeId: number;
}

export enum AppStage {
  START = "START",
  ROUND_INTRO = "ROUND_INTRO",
  DRAWING = "DRAWING",
  INTERMEDIATE_RESULTS = "INTERMEDIATE_RESULTS",
  FINAL_BLESSING = "FINAL_BLESSING",
  RESULTS = "RESULTS",
}
