"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef } from "react";
import { useGameLogic } from "./hooks";
import { Confetti, ScoreBoard } from "./components";
import { GameBoard } from "./components/GameBoard";
import { GameHeader } from "./components/GameHeader";
import { CONFETTI_COLORS } from "./constants";
import { wordPairs } from "./data/wordPairs";

export function WordMemoryGame() {
  const [showGrade, setShowGrade] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

  const englishCards = cards.filter((card) => card.type === "english");
  const frenchCards = cards.filter((card) => card.type === "french");

  const handleGradeClick = async () => {
    if (showGrade) {
      setIsLoading(true);
      if (!isPlaying) {
        startGame();
        completionToastShown.current = false;
      } else {
        resetGame();
        completionToastShown.current = false;
      }
      setShowGrade(false);
      setIsLoading(false);
    } else {
      const correctPercentage = Math.round(
        (matchedPairs / wordPairs.length) * 100
      );
      toast.info(`Your score: ${correctPercentage}%`, {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
      setShowGrade(true);
      resetGame();
      completionToastShown.current = false;
    }
  };

  if (
    gameLevel === "complete" &&
    score !== null &&
    !completionToastShown.current
  ) {
    toast.success(`🎉 You've completed the game!`);
    completionToastShown.current = true;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            <Confetti colors={CONFETTI_COLORS} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <GameHeader
          showGrade={showGrade}
          isLoading={isLoading}
          gameLevel={gameLevel}
          moves={moves}
          gameTime={gameTime}
          matchedPairs={matchedPairs}
          totalPairs={wordPairs.length}
          onGradeClick={handleGradeClick}
        />

        <AnimatePresence mode="wait">
          {score !== null && gameLevel === "complete" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <ScoreBoard
                gameTime={gameTime}
                moves={moves}
                onPlayAgain={() => {
                  resetGame();
                  setShowGrade(false);
                  completionToastShown.current = false;
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isPlaying && (
            <GameBoard
              englishCards={englishCards}
              frenchCards={frenchCards}
              handleCardClick={handleCardClick}
              canFlip={canFlip}
            />
          )}
        </AnimatePresence>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
