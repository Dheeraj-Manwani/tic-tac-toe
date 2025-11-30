import { useState } from "react";
import { Square } from "./square";
import { motion, AnimatePresence } from "motion/react";
import { gameAudio } from "@/lib/audio";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { WINNING_COMBINATIONS } from "@/lib/data";

type Player = "X" | "O";
type BoardState = (Player | null)[];

export function Board() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | "Draw" | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentPlayer = isXNext ? "X" : "O";

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
    } else if (!newBoard.includes(null)) {
      setWinner("Draw");
      gameAudio.playReset(); // Sad sound? or just reset sound
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
    gameAudio.playReset();
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    gameAudio.toggle(!soundEnabled);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full mx-auto p-6">
      {/* Game Header / Status */}
      <div className="w-full flex items-center justify-between glass-panel p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div
            className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
              isXNext && !winner
                ? "bg-[hsl(180,100%,50%)] text-black font-bold shadow-[0_0_10px_hsl(180,100%,50%)]"
                : "text-gray-400"
            }`}
          >
            Player X
          </div>
          <div
            className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
              !isXNext && !winner
                ? "bg-[hsl(320,100%,60%)] text-black font-bold shadow-[0_0_10px_hsl(320,100%,60%)]"
                : "text-gray-400"
            }`}
          >
            Player O
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSound}
          className="text-white/70 hover:text-white hover:bg-white/10 rounded-full h-8 w-8"
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

      {/* Game Over / Reset */}
      <div className="h-16 flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {winner ? (
            <motion.div
              key="result"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="text-2xl font-display font-bold tracking-wider">
                {winner === "Draw" ? (
                  <span className="text-white/80">It's a Draw!</span>
                ) : (
                  <span
                    className={
                      winner === "X"
                        ? "text-[hsl(180,100%,50%)] neon-text-glow"
                        : "text-[hsl(320,100%,60%)] neon-text-glow"
                    }
                  >
                    Player {winner} Wins!
                  </span>
                )}
              </div>
              <Button
                onClick={resetGame}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md rounded-full px-8 gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <RotateCcw size={16} /> Play Again
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-white/50 font-display tracking-widest text-sm uppercase"
            >
              {isXNext ? "X's Turn" : "O's Turn"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
