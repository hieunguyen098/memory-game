import { useState, useRef, useEffect } from "react";
import { Card } from "../types";
import { wordPairs } from "../data/wordPairs";

interface UseGameLogicResult {
  cards: Card[];
  flippedCards: Card[];
  matchedPairs: number;
  moves: number;
  canFlip: boolean;
  score: number | null;
  showConfetti: boolean;
  gameStartTime: number | null;
  gameTime: number;
  gameLevel: "preview" | "playing" | "complete";
  isPlaying: boolean;
  startGame: () => void;
  handleCardClick: (card: Card) => void;
  resetGame: () => void;
}

export function useGameLogic(): UseGameLogicResult {
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

  // Game timer effect
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

  // Create cards in two columns - English and French
  const startGame = () => {
    const englishCards: Card[] = [];
    const frenchCards: Card[] = [];

    // Create English cards (left column)
    wordPairs.forEach((pair, index) => {
      englishCards.push({
        id: index + 1,
        wordPairId: pair.id,
        type: "english",
        content: pair.english,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Create French cards (right column)
    wordPairs.forEach((pair, index) => {
      frenchCards.push({
        id: englishCards.length + index + 1,
        wordPairId: pair.id,
        type: "french",
        content: pair.french,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle each column separately
    const shuffledEnglishCards = [...englishCards].sort(
      () => Math.random() - 0.5
    );
    const shuffledFrenchCards = [...frenchCards].sort(
      () => Math.random() - 0.5
    );

    // Combine into final array, but keep columns separate
    const combinedCards = [...shuffledEnglishCards, ...shuffledFrenchCards];

    setCards(combinedCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setScore(null);
    setIsPlaying(true);
    setCanFlip(false);
    setGameLevel("preview");

    // Preview phase - show all cards briefly
    setCards(combinedCards.map((card) => ({ ...card, isFlipped: true })));

    // After preview, flip cards back and start the game
    setTimeout(() => {
      setCards(
        combinedCards.map((card) => ({
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

  // Reset game
  const resetGame = () => {
    setIsPlaying(false);
    setTimeout(startGame, 300);
  };

  // Handle card click
  const handleCardClick = (card: Card) => {
    if (!canFlip || card.isFlipped || card.isMatched || gameLevel !== "playing")
      return;

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
          if (matchedPairs + 1 === wordPairs.length) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }

            // Calculate score
            const timeBonus = Math.max(0, 1000 - gameTime);
            const moveQuality = Math.max(0, wordPairs.length * 3 - moves);
            const finalScore = Math.min(
              100,
              Math.floor(
                (moveQuality * 70 + timeBonus * 0.03) / wordPairs.length
              )
            );

            setScore(finalScore);
            setGameLevel("complete");

            // Big celebration for completion
            setTimeout(() => {
              setShowConfetti(true);
            }, 600);
          }
        }, 600);
      } else {
        // No match
        setTimeout(() => {
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

  return {
    cards,
    flippedCards,
    matchedPairs,
    moves,
    canFlip,
    score,
    showConfetti,
    gameStartTime,
    gameTime,
    gameLevel,
    isPlaying,
    startGame,
    handleCardClick,
    resetGame,
  };
}
