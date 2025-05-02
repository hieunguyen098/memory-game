import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StatsDisplay } from "./StatsDisplay";

interface GameHeaderProps {
  showGrade: boolean;
  isLoading: boolean;
  gameLevel: string;
  moves: number;
  gameTime: number;
  matchedPairs: number;
  totalPairs: number;
  onGradeClick: () => void;
}

export function GameHeader({
  showGrade,
  isLoading,
  gameLevel,
  moves,
  gameTime,
  matchedPairs,
  totalPairs,
  onGradeClick,
}: GameHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-8"
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 mb-6"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Word Memory
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-4 items-center">
        <Button
          onClick={onGradeClick}
          disabled={isLoading}
          className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{
            background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
            minWidth: "120px",
            height: "48px",
            fontSize: "1.1rem",
            fontWeight: "600",
          }}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <span>{showGrade ? "GO!" : "GRADE"}</span>
          )}
        </Button>
      </div>

      {gameLevel === "playing" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <StatsDisplay
            moves={moves}
            gameTime={gameTime}
            matchedPairs={matchedPairs}
            totalPairs={totalPairs}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
