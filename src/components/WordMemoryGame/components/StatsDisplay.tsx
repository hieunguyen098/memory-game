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
    <div className="stats-container">
      <div className="stat-item moves-stat">
        <Icons.Steps />
        <span className="stat-label">Moves</span>
        <span className="stat-value">{moves}</span>
      </div>

      <div className="stat-item time-stat">
        <Icons.Clock />
        <span className="stat-label">Time</span>
        <span className="stat-value">{formatTime(gameTime)}</span>
      </div>

      <div className="stat-item pairs-stat">
        <Icons.Pairs />
        <span className="stat-label">Pairs</span>
        <span className="stat-value">
          {matchedPairs}/{totalPairs}
        </span>
      </div>
    </div>
  );
};
