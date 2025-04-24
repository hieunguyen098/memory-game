export type CardType = "english" | "french";

export interface Card {
  id: number;
  wordPairId: number;
  type: CardType;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  isFlipping?: boolean;
}

export interface WordPair {
  id: number;
  english: string;
  french: string;
}
