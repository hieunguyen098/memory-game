import { memo } from "react";

interface ConfettiProps {
  colors: string[];
}

export const Confetti = memo(({ colors }: ConfettiProps) => {
  const confetti = Array.from({ length: 30 }).map((_, i) => (
    <div
      key={i}
      className="confetti"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 30}%`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        width: `${Math.random() * 10 + 5}px`,
        height: `${Math.random() * 10 + 5}px`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${Math.random() * 3 + 2}s`,
      }}
    />
  ));

  return <>{confetti}</>;
});

Confetti.displayName = "Confetti";
