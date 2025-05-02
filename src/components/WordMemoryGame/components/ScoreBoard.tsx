import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "./Icons";
import { formatTime } from "../utils/formatTime";

interface ScoreBoardProps {
  gameTime: number;
  moves: number;
  onPlayAgain: () => void;
}

export const ScoreBoard = ({
  gameTime,
  moves,
  onPlayAgain,
}: ScoreBoardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex flex-col items-center bg-gradient-to-br from-white to-gray-50/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md mx-auto border border-gray-100"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-500 p-4 rounded-full shadow-lg"
      >
        <Icons.Trophy className="w-16 h-16 text-white" />
      </motion.div>

      <div className="mt-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4"
        >
          Congratulations!
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 mb-8"
        >
          You completed the game in{" "}
          <span className="font-semibold text-emerald-600">
            {formatTime(gameTime)}
          </span>{" "}
          with <span className="font-semibold text-emerald-600">{moves}</span>{" "}
          moves
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full"
      >
        <Button
          onClick={onPlayAgain}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg font-medium text-lg"
        >
          <Icons.Play className="w-5 h-5" />
          <span>Play Again</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};
