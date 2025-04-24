"use client";

import { useState, useRef, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Card types: English and French
type CardType = "english" | "french";

interface Card {
  id: number;
  wordPairId: number;
  type: CardType;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  isFlipping?: boolean;
}

interface WordPair {
  id: number;
  english: string;
  french: string;
}

/*const initialWordPairs: WordPair[] = [
  { id: 1, english: "forest", french: "forêt" },
  { id: 2, english: "sibling", french: "frère et sœur" },
  { id: 3, english: "cereal", french: "céréale" },
  { id: 4, english: "desk", french: "bureau" },
  { id: 5, english: "camel", french: "chameau" },
  { id: 6, english: "butter", french: "beurre" },
  { id: 7, english: "bicycle", french: "vélo" },
  { id: 8, english: "railroad", french: "chemin de fer" },
  { id: 9, english: "folder", french: "dossier" },
  { id: 10, english: "weekly", french: "hebdomadaire" },
  { id: 11, english: "hungry", french: "faim" },
  { id: 12, english: "limestone", french: "calcaire" },
];*/

const initialWordPairs: WordPair[] = [
  { id: 1, english: "tau", french: "tao" },
  { id: 2, english: "hấn", french: "nó" },
  { id: 3, english: "mi", french: "mày" },
  { id: 4, english: "nỏ", french: "không" },
  { id: 5, english: "choa", french: "chúng tao" },
  { id: 6, english: "bây", french: "tụi mày" },
  { id: 7, english: "nớ", french: "đó, ấy" },
  { id: 8, english: "rứa", french: "như vậy" },
  { id: 9, english: "mô", french: "đâu" },
  { id: 10, english: "răng", french: "sao" },
  { id: 11, english: "rứa à", french: "thật à" },
  { id: 12, english: "Hấn nỏ mần chi", french: "Nó không làm gì" },
];

// Icons for the game UI
const Icons = {
  Brain: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 0 19.5v-15A2.5 2.5 0 0 1 2.5 2h7z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5 2.5h7a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 21.5 2h-7z" />
      <path d="M6 12h6" />
      <path d="M6 17h6" />
      <path d="M18 7h-6" />
      <path d="M18 12h-6" />
      <path d="M18 17h-6" />
    </svg>
  ),
  Clock: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  Steps: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M13 5v6h6" />
      <path d="m18 2 4 4-4 4" />
      <path d="M11 19v-6H5" />
      <path d="m6 22-4-4 4-4" />
    </svg>
  ),
  Pairs: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <rect width="8" height="8" x="2" y="2" rx="2" />
      <path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
      <path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
      <path d="M10 18H5c-1.7 0-3-1.3-3-3v-1" />
      <rect width="8" height="8" x="14" y="14" rx="2" />
    </svg>
  ),
  Play: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m10 8 6 4-6 4V8Z" />
    </svg>
  ),
  Restart: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  ),
  Trophy: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 text-amber-500"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  Eye: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

// Simplified confetti component
const Confetti = memo(({ colors }: { colors: string[] }) => {
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

// Optimized card component
const MemoryCard = memo(
  ({
    card,
    onClick,
    canFlip,
  }: {
    card: Card;
    onClick: () => void;
    canFlip: boolean;
  }) => {
    const classes = `w-full h-full rounded-lg cursor-pointer 
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
          <div className="card-back">
            <div className="card-content">
              <p className="content-word">{card.content}</p>
              <span
                className={`type-label ${
                  card.type === "english" ? "english-label" : "french-label"
                }`}
              >
                {card.type}
              </span>
            </div>
          </div>
        ) : (
          <div className="card-front">
            <span className="question-mark float-animation">?</span>
          </div>
        )}
      </div>
    );
  }
);

MemoryCard.displayName = "MemoryCard";

export function WordMemoryGame1() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState(0);
  const [canFlip, setCanFlip] = useState(true);
  const [score, setScore] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [gameTime, setGameTime] = useState<number>(0);
  const [gameLevel, setGameLevel] = useState<
    "preview" | "playing" | "complete"
  >("preview");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const confettiColors = [
    "#FF5252",
    "#FF4081",
    "#E040FB",
    "#7C4DFF",
    "#536DFE",
    "#448AFF",
    "#40C4FF",
    "#18FFFF",
    "#64FFDA",
    "#69F0AE",
    "#B2FF59",
    "#EEFF41",
    "#FFFF00",
    "#FFD740",
    "#FFAB40",
    "#FF6E40",
  ];

  useEffect(() => {
    if (isPlaying && gameStartTime && gameLevel === "playing") {
      timerRef.current = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - gameStartTime) / 1000);
        setGameTime(elapsedSeconds);
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [isPlaying, gameStartTime, gameLevel]);

  // Format seconds into MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Create and shuffle cards
  const startGame = () => {
    const gameCards: Card[] = [];

    // Create English cards
    initialWordPairs.forEach((pair) => {
      gameCards.push({
        id: gameCards.length + 1,
        wordPairId: pair.id,
        type: "english",
        content: pair.english,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Create French cards
    initialWordPairs.forEach((pair) => {
      gameCards.push({
        id: gameCards.length + 1,
        wordPairId: pair.id,
        type: "french",
        content: pair.french,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffledCards = [...gameCards].sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setScore(null);
    setIsPlaying(true);
    setCanFlip(false);
    setGameLevel("preview");

    // Preview phase - show all cards briefly
    setCards(shuffledCards.map((card) => ({ ...card, isFlipped: true })));

    // After preview, flip cards back and start the game
    setTimeout(() => {
      setCards(
        shuffledCards.map((card) => ({
          ...card,
          isFlipped: false,
          isFlipping: true,
        }))
      );

      // Remove isFlipping flag after animation completes
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card) => ({
            ...card,
            isFlipping: false,
          }))
        );
      }, 300);

      setGameStartTime(Date.now());
      setGameTime(0);
      setCanFlip(true);
      setGameLevel("playing");
    }, 3000);
  };

  // Simplified handler for card click
  const handleCardClick = (card: Card) => {
    if (!canFlip || card.isFlipped || card.isMatched || gameLevel !== "playing")
      return;

    // Play flip sound - with error handling
    const flipSound = new Audio("/flip.mp3");
    flipSound.volume = 0.3;
    flipSound.play().catch(() => {
      /* silent error handling */
    });

    // Add flipping animation
    setCards((prev) =>
      prev.map((c) =>
        c.id === card.id ? { ...c, isFlipped: true, isFlipping: true } : c
      )
    );

    // Remove isFlipping flag after animation completes
    setTimeout(() => {
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, isFlipping: false } : c))
      );
    }, 300);

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    // If we have 2 flipped cards, check for a match
    if (newFlippedCards.length === 2) {
      setCanFlip(false);
      setMoves((prev) => prev + 1);

      const [first, second] = newFlippedCards;

      // Check if they belong to the same word pair
      if (
        first.wordPairId === second.wordPairId &&
        first.type !== second.type
      ) {
        // Match!
        setTimeout(() => {
          // Play match sound - with error handling
          const matchSound = new Audio("/match.mp3");
          matchSound.volume = 0.6;
          matchSound.play().catch(() => {
            /* silent error handling */
          });

          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isMatched: true }
                : c
            )
          );
          setFlippedCards([]);
          setMatchedPairs((prev) => prev + 1);
          setCanFlip(true);

          // Show confetti for matched pair
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 1000);

          // If all pairs are matched, game over
          if (matchedPairs + 1 === initialWordPairs.length) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }

            // Calculate score
            const timeBonus = Math.max(0, 1000 - gameTime);
            const moveQuality = Math.max(
              0,
              initialWordPairs.length * 3 - moves
            );
            const finalScore = Math.min(
              100,
              Math.floor(
                (moveQuality * 70 + timeBonus * 0.03) / initialWordPairs.length
              )
            );

            setScore(finalScore);
            setGameLevel("complete");

            // Big celebration for completion
            setTimeout(() => {
              setShowConfetti(true);
              toast.success(`🎉 You've completed the game!`);
            }, 600);
          }
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          // Play error sound - with error handling
          const errorSound = new Audio("/error.mp3");
          errorSound.volume = 0.2;
          errorSound.play().catch(() => {
            /* silent error handling */
          });

          // Add flipping animation for unmatched cards
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isFlipped: false, isFlipping: true }
                : c
            )
          );

          // Remove isFlipping flag after animation
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === first.id || c.id === second.id
                  ? { ...c, isFlipping: false }
                  : c
              )
            );
          }, 300);

          setFlippedCards([]);
          setCanFlip(true);
        }, 800);
      }
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <Confetti colors={confettiColors} />
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6"
        >
          <h1 className="game-title">Word Memory</h1>

          <div className="flex flex-wrap justify-center gap-4 items-center">
            <Button
              onClick={
                isPlaying
                  ? () => {
                      if (
                        window.confirm(
                          "Are you sure you want to restart the game?"
                        )
                      ) {
                        setIsPlaying(false);
                        setTimeout(startGame, 300);
                      }
                    }
                  : startGame
              }
              className="game-button"
            >
              {isPlaying ? (
                <>
                  <Icons.Restart />
                  <span>Restart</span>
                </>
              ) : (
                <>
                  <Icons.Play />
                  <span>Start Game</span>
                </>
              )}
            </Button>
          </div>

          {isPlaying && gameLevel === "playing" && (
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
                  {matchedPairs}/{initialWordPairs.length}
                </span>
              </div>
            </div>
          )}

          {gameLevel === "preview" && isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-4 memorize-text"
            >
              <Icons.Eye />
              <span>Memorize the cards!</span>
            </motion.div>
          )}
        </motion.div>

        {score !== null && gameLevel === "complete" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="score-container"
          >
            <div className="flex justify-center mb-4">
              <Icons.Trophy />
            </div>
            <h2 className="score-title">Game Complete!</h2>
            <div className="score-subtitle">
              You completed the game in {formatTime(gameTime)} with {moves}{" "}
              moves.
            </div>
            <div className="score-value">{score}%</div>
            <Button
              onClick={() => {
                setIsPlaying(false);
                setTimeout(startGame, 300);
              }}
              className="game-button mt-8"
            >
              <Icons.Play />
              <span>Play Again</span>
            </Button>
          </motion.div>
        )}

        {isPlaying && (
          <div className="game-container">
            <div
              className="game-board-appear"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "center",
                width: "fit-content",
                margin: "0 auto",
              }}
            >
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="memory-card"
                  style={{
                    marginRight: (index + 1) % 6 === 0 ? "0" : "",
                    marginBottom: "16px",
                    flexBasis: "calc(16.666% - 14px)",
                    opacity: 1,
                    transform: "scale(1)",
                  }}
                >
                  <MemoryCard
                    card={card}
                    onClick={() => handleCardClick(card)}
                    canFlip={canFlip}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
