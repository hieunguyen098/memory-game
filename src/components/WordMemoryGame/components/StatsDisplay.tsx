import { Icons } from "./Icons";
import { formatTime } from "../utils/formatTime";

interface StatsDisplayProps {
  moves: number;
  gameTime: number;
  matchedPairs: number;
  totalPairs: number;
}

export const StatsDisplay = ({
  moves,
  gameTime,
  matchedPairs,
  totalPairs,
}: StatsDisplayProps) => {
  return (
    <div className="flex justify-center gap-8 mt-6">
      <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md">
        <Icons.Steps className="w-6 h-6 text-emerald-600 mb-2" />
        <span className="text-sm font-medium text-gray-600">Moves</span>
        <span className="text-xl font-bold text-gray-800">{moves}</span>
      </div>

      <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md">
        <Icons.Clock className="w-6 h-6 text-emerald-600 mb-2" />
        <span className="text-sm font-medium text-gray-600">Time</span>
        <span className="text-xl font-bold text-gray-800">
          {formatTime(gameTime)}
        </span>
      </div>

      <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md">
        <Icons.Pairs className="w-6 h-6 text-emerald-600 mb-2" />
        <span className="text-sm font-medium text-gray-600">Pairs</span>
        <span className="text-xl font-bold text-gray-800">
          {matchedPairs}/{totalPairs}
        </span>
      </div>
    </div>
  );
};
