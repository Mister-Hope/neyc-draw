export interface PrizeCategory {
  id: number;
  name: string;
  count: number;
  description: string;
}

export interface Winner {
  name: string;
  prizeName: string;
  prizeId: number;
}

export enum AppStage {
  START = "START",
  DRAWING = "DRAWING",
  RESULTS = "RESULTS",
}
