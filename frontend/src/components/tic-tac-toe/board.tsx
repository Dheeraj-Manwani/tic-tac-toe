import { useState, useEffect, useRef } from "react";
import { Square } from "./square";
import { motion } from "motion/react";
import { gameAudio } from "@/lib/audio";
// @ts-ignore - canvas-confetti doesn't have types
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, X as XIcon, Circle, Clock } from "lucide-react";
import { WINNING_COMBINATIONS } from "@/lib/data";
import { GameResultModal } from "@/components/GameResultModal";

type Player = "X" | "O";
type BoardState = (Player | null)[];

const TIMER_DURATION = 30; // 30 seconds per turn

export function Board() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | "Draw" | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentPlayer = isXNext ? "X" : "O";

  // Timer countdown effect
  useEffect(() => {
    if (winner) {
      // Stop timer if game is over
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // Reset timer when turn changes
    setTimeLeft(TIMER_DURATION);

    // Start countdown
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up! Other player wins
          const losingPlayer = currentPlayer;
          const winningPlayer: Player = losingPlayer === "X" ? "O" : "X";

          // Clear timer
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }

          // Set winner and show modal
          setWinner(winningPlayer);
          setShowModal(true);
          gameAudio.playWin();
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#00ffff", "#ff00aa", "#ffffff"],
          });

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isXNext, winner, currentPlayer]);

  const checkWinner = (squares: BoardState) => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: WINNING_COMBINATIONS[i] };
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    // Reset timer when move is made
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimeLeft(TIMER_DURATION);

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    gameAudio.playMark(currentPlayer);

    const winResult = checkWinner(newBoard);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningLine(winResult.line);
      gameAudio.playWin();
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00ffff", "#ff00aa", "#ffffff"],
      });
      setShowModal(true);
    } else if (!newBoard.includes(null)) {
      setWinner("Draw");
      gameAudio.playReset();
      setShowModal(true);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
    setShowModal(false);
    setTimeLeft(TIMER_DURATION);
    gameAudio.playReset();
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    gameAudio.toggle(!soundEnabled);
  };

  return (
    <>
      {/* Screen-wide Turn Indicator Effect */}
      {!winner && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={currentPlayer}
        >
          {/* Animated Border Glow */}
          <motion.div
            className={`absolute inset-0 border-4 ${
              isXNext
                ? "border-[hsl(180,100%,50%)]"
                : "border-[hsl(320,100%,60%)]"
            }`}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              borderRadius: 0,
              boxShadow: isXNext
                ? "inset 0 0 120px hsl(180,100%,50%)"
                : "inset 0 0 120px hsl(320,100%,60%)",
            }}
          />

          {/* Corner Glow Effects */}
          <motion.div
            className={`absolute top-0 left-0 w-64 h-64 ${
              isXNext ? "bg-[hsl(180,100%,50%)]" : "bg-[hsl(320,100%,60%)]"
            } blur-[100px] rounded-full`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={`absolute bottom-0 right-0 w-64 h-64 ${
              isXNext ? "bg-[hsl(180,100%,50%)]" : "bg-[hsl(320,100%,60%)]"
            } blur-[100px] rounded-full`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Subtle Background Overlay */}
          <motion.div
            className={`absolute inset-0 ${
              isXNext ? "bg-[hsl(180,100%,50%)]" : "bg-[hsl(320,100%,60%)]"
            }`}
            animate={{
              opacity: [0, 0.03, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}

      <div className="flex flex-col items-center gap-8 w-full mx-auto p-6 relative z-10">
        {/* Game Header / Status - Simplified */}
        <div className="w-full flex items-center justify-between glass-panel p-4 rounded-2xl">
          <div className="flex items-center gap-4 flex-1">
            {/* Timer Display */}
            {!winner && (
              <motion.div
                key={currentPlayer}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: timeLeft <= 10 ? [1, 1.1, 1] : 1,
                  opacity: 1,
                }}
                transition={
                  timeLeft <= 10
                    ? {
                        scale: {
                          duration: 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }
                    : {}
                }
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                  timeLeft <= 10
                    ? "bg-red-500/20 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                    : timeLeft <= 15
                    ? "bg-orange-500/20 border border-orange-500/50"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <Clock
                  className={`w-4 h-4 ${
                    timeLeft <= 10
                      ? "text-red-400"
                      : timeLeft <= 15
                      ? "text-orange-400"
                      : "text-white/60"
                  }`}
                />
                <span
                  className={`font-mono font-bold text-lg ${
                    timeLeft <= 10
                      ? "text-red-400"
                      : timeLeft <= 15
                      ? "text-orange-400"
                      : "text-white"
                  }`}
                >
                  {timeLeft}s
                </span>
              </motion.div>
            )}
            {/* Player X Indicator */}
            <div
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                isXNext && !winner
                  ? "bg-[hsl(180,100%,50%)] text-black font-bold shadow-[0_0_20px_hsl(180,100%,50%)]"
                  : "bg-white/5 text-white/40"
              }`}
            >
              <XIcon
                className={`w-5 h-5 ${
                  isXNext && !winner ? "text-black" : "text-white/40"
                }`}
                strokeWidth={3}
              />
              <span className="text-sm font-medium">Player X</span>
            </div>

            {/* VS Separator */}
            <div className="text-white/20 text-xs font-bold">VS</div>

            {/* Player O Indicator */}
            <div
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                !isXNext && !winner
                  ? "bg-[hsl(320,100%,60%)] text-black font-bold shadow-[0_0_20px_hsl(320,100%,60%)]"
                  : "bg-white/5 text-white/40"
              }`}
            >
              <Circle
                className={`w-5 h-5 ${
                  !isXNext && !winner ? "text-black" : "text-white/40"
                }`}
                strokeWidth={3}
              />
              <span className="text-sm font-medium">Player O</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSound}
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full h-8 w-8 ml-4"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </Button>
        </div>

        {/* Board Grid */}
        <motion.div
          className="grid grid-cols-3 gap-3 sm:gap-4 p-4 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-sm shadow-2xl relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Winning Line Connector (Optional visualization, simplified for now) */}
          {winner && winner !== "Draw" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 pointer-events-none z-0"
            >
              {/* We could draw an SVG line here, but highlighting squares is cleaner for responsive */}
            </motion.div>
          )}

          {board.map((square, i) => (
            <Square
              key={i}
              index={i}
              value={square}
              onClick={() => handleClick(i)}
              disabled={!!winner || !!square}
              isWinning={winningLine.includes(i)}
            />
          ))}
        </motion.div>
      </div>

      {/* Game Result Modal */}
      <GameResultModal
        isOpen={showModal}
        winner={winner}
        onClose={() => setShowModal(false)}
        onPlayAgain={resetGame}
      />
    </>
  );
}
