import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "./Icons";
import { formatTime } from "../utils/formatTime";

interface ScoreBoardProps {
  score: number;
  gameTime: number;
  moves: number;
  onPlayAgain: () => void;
}

export const ScoreBoard = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  score,
  gameTime,
  moves,
  onPlayAgain,
}: ScoreBoardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="score-container flex flex-col items-center"
    >
      <div className="flex justify-center mb-4">
        <Icons.Trophy />
      </div>
      <h2 className="score-title">
        Haizz có thế thôi cũng làm mãi mới xong. Kém cỏi qua nha!!!
      </h2>
      <div className="score-subtitle">
        You completed the game in {formatTime(gameTime)} with {moves} moves.
      </div>

      <Button onClick={onPlayAgain} className="game-button mt-8">
        <Icons.Play />
        <span>Play Again</span>
      </Button>
    </motion.div>
  );
};
