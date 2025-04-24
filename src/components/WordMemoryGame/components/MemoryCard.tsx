import { memo } from "react";
import { Card } from "../types";

interface MemoryCardProps {
  card: Card;
  onClick: () => void;
  canFlip: boolean;
}

export const MemoryCard = memo(
  ({ card, onClick, canFlip }: MemoryCardProps) => {
    const classes = `w-full h-full rounded-lg cursor-pointer transition-all duration-300
    ${!canFlip ? "pointer-events-none" : ""} 
    ${card.isMatched ? "card-matched" : ""}
    ${
      card.isFlipping
        ? card.isFlipped
          ? "card-flip-enter"
          : "card-flip-exit"
        : ""
    }`;

    return (
      <div className={classes} onClick={onClick}>
        {card.isFlipped || card.isMatched ? (
          <div className="card-back h-full flex items-center justify-center p-2 rounded-lg bg-white shadow-md border border-gray-200">
            <div className="card-content flex justify-center items-center w-full">
              <p className="content-word text-base font-medium mr-2">
                {card.content}
              </p>
              {/*<span
                className={`type-label text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                  card.type === "english" ? "english-label" : "french-label"
                }`}
              >
                {card.type}
              </span>*/}
            </div>
          </div>
        ) : (
          <div className="card-front h-full flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md">
            <span className="question-mark float-animation text-xl font-bold text-white">
              ?
            </span>
          </div>
        )}
      </div>
    );
  }
);

MemoryCard.displayName = "MemoryCard";
