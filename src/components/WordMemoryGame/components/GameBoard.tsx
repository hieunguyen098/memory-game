import { motion } from "framer-motion";
import { MemoryCard } from "./MemoryCard";
import { Card } from "../types";

interface GameBoardProps {
  englishCards: Card[];
  frenchCards: Card[];
  handleCardClick: (card: Card) => void;
  canFlip: boolean;
}

export function GameBoard({
  englishCards,
  frenchCards,
  handleCardClick,
  canFlip,
}: GameBoardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6"
    >
      <div className="grid grid-cols-2 gap-8">
        {/* English Column */}
        <div className="flex flex-col gap-4">
          {englishCards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MemoryCard
                card={card}
                onClick={() => handleCardClick(card)}
                canFlip={canFlip}
              />
            </motion.div>
          ))}
        </div>

        {/* French Column */}
        <div className="flex flex-col gap-4">
          {frenchCards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MemoryCard
                card={card}
                onClick={() => handleCardClick(card)}
                canFlip={canFlip}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
