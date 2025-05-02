import { memo } from "react";
import { Card } from "../types";

interface MemoryCardProps {
  card: Card;
  onClick: () => void;
  canFlip: boolean;
}

export const MemoryCard = memo(
  ({ card, onClick, canFlip }: MemoryCardProps) => {
    const baseClasses =
      "w-full h-[100px] rounded-xl cursor-pointer transition-all duration-500 transform-gpu";
    const disabledClasses = !canFlip ? "pointer-events-none" : "";
    const matchedClasses = card.isMatched ? "opacity-60" : "";
    const flipClasses = card.isFlipping
      ? card.isFlipped
        ? "rotate-y-180"
        : "rotate-y-0"
      : "";

    return (
      <div
        className={`${baseClasses} ${disabledClasses} ${matchedClasses} ${flipClasses} hover:scale-[1.02]`}
        onClick={onClick}
      >
        {card.isFlipped || card.isMatched ? (
          <div className="h-full flex items-center justify-center p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col justify-center items-center w-full gap-2">
              <p className="text-lg font-semibold text-gray-800 text-center">
                {card.content}
              </p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  card.type === "english"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {card.type}
              </span>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="text-3xl font-bold text-white animate-float">
              ?
            </span>
          </div>
        )}
      </div>
    );
  }
);

MemoryCard.displayName = "MemoryCard";
