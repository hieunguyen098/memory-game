"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef } from "react";
import { useGameLogic } from "./hooks";
import {
  Confetti,
  Icons,
  MemoryCard,
  ScoreBoard,
  StatsDisplay,
} from "./components";
import { wordPairs } from "./data/wordPairs";

export function WordMemoryGame() {
  const [showGrade, setShowGrade] = useState(true);
  const completionToastShown = useRef(false);

  const {
    cards,
    matchedPairs,
    moves,
    canFlip,
    score,
    showConfetti,
    gameTime,
    gameLevel,
    isPlaying,
    startGame,
    handleCardClick,
    resetGame,
  } = useGameLogic();

  // Don't auto-start the game when component loads
  // We'll let the GO! button handle that

  // Split cards into English and French columns
  const englishCards = cards.filter((card) => card.type === "english");
  const frenchCards = cards.filter((card) => card.type === "french");

  // Confetti colors
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

  // Handle Grade/GO! button click
  const handleGradeClick = () => {
    if (showGrade) {
      // GO! button is clicked
      if (!isPlaying) {
        // Start the game if not already playing
        startGame();
        // Reset completion toast tracker when starting a new game
        completionToastShown.current = false;
      } else {
        // Reset the game if already playing
        resetGame();
        // Reset completion toast tracker when resetting
        completionToastShown.current = false;
      }
      setShowGrade(false); // Change to GRADE
    } else {
      // GRADE button is clicked
      setShowGrade(true); // Change to GO!

      // Calculate percentage of correct matches
      const correctPercentage = Math.round(
        (matchedPairs / wordPairs.length) * 100
      );
      // Show score on the game board instead of toast
      toast.info(`Your score: ${correctPercentage}%`, {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
    }
  };

  // Show toast when game completes, but only once
  if (
    gameLevel === "complete" &&
    score !== null &&
    !completionToastShown.current
  ) {
    //toast.success(`🎉 You've completed the game!`);
    toast.success(`🎉 Hơi non nha! Gà thiệt sự`);

    completionToastShown.current = true;
  }

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
          <h1 className="game-title">
            Word Memory cho Người Hải Phòng nói giọng Nam
          </h1>

          <div className="flex flex-wrap justify-center gap-4 items-center">
            <Button
              onClick={handleGradeClick}
              className="grade-button"
              style={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              }}
            >
              <span>{showGrade ? "GO!" : "GRADE"}</span>
            </Button>
          </div>

          {gameLevel === "playing" && (
            <StatsDisplay
              moves={moves}
              gameTime={gameTime}
              matchedPairs={matchedPairs}
              totalPairs={wordPairs.length}
            />
          )}

          {gameLevel === "preview" && (
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
          <ScoreBoard
            score={score}
            gameTime={gameTime}
            moves={moves}
            onPlayAgain={() => {
              resetGame();
              setShowGrade(false);
              // Reset completion toast tracker when playing again
              completionToastShown.current = false;
            }}
          />
        )}

        {isPlaying && (
          <div className="game-container">
            <div className="column-headers flex justify-center gap-8 mb-4 md:gap-20">
              <div className="column-label english-column-label">Miền Bắc</div>
              <div className="column-label french-column-label">Miền Nam</div>
            </div>
            <div className="game-board-two-columns">
              {/* English Column */}
              <div className="column english-column">
                {englishCards.map((card) => (
                  <div key={card.id} className="memory-card-container">
                    <MemoryCard
                      card={card}
                      onClick={() => handleCardClick(card)}
                      canFlip={canFlip}
                    />
                  </div>
                ))}
              </div>

              {/* French Column */}
              <div className="column french-column">
                {frenchCards.map((card) => (
                  <div key={card.id} className="memory-card-container">
                    <MemoryCard
                      card={card}
                      onClick={() => handleCardClick(card)}
                      canFlip={canFlip}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
